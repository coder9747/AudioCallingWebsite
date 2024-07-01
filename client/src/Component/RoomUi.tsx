import  { useEffect, useState } from 'react'
import Nav from './Nav';
import { useDispatch } from 'react-redux';
import { StartRtc } from '../libs/Agora';
import { updateUsers, updateCallState, userLeft } from '../Store/CallSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';


const RoomUi = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState({
        name: "",
        roomName: "",
    })
    const handleJoinRoom = async () => {
        setLoading(true);
        try {
            const { rtcClient, audioTracks } = await StartRtc(userInfo.roomName, (arg: any) => dispatch(updateUsers(arg)), (user: any) => dispatch(userLeft(user)));
            dispatch(updateCallState({
                name: userInfo.roomName,
                localAudioTracks: audioTracks,
                rtcClient: rtcClient,
            }));
            navigate("/dashboard");
        } catch (error) {
            alert("Error While Joining Room");
        }
        setLoading(true);

    }
    const handleChange = async (e: any) => {
        //@ts-ignore
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        const roomName = searchParams.get("roomName");
        if (roomName) {
            setUserInfo({ ...userInfo, roomName });
        }
    }, [])
    return (
        <>
            <Nav />
            <div className='flex h-screen justify-center bg-primary items-center'>
                <div className='flex flex-col gap-2  sm:w-40 md:w-96 p-5'>
                    <input name='name' value={userInfo.name} onChange={handleChange} placeholder='Enter Name ' type="text" className='h-10 outline-none p-2 rounded' />
                    <input name='roomName' value={userInfo.roomName} onChange={handleChange} placeholder='Enter Room Id ' type="text" className='h-10 outline-none p-2 rounded' />
                    <button onClick={handleJoinRoom} className='py-2 px-5 text-white bg-violet-500 rounded'>{loading ? "loading..." : "Join Room"}</button>
                </div>
            </div>
        </>
    )
}

export default RoomUi
