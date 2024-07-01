import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigato = useNavigate();
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => setShow(false), 10000);
    }, [])
    //@ts-ignore
    const data = useSelector((state) => state.CallSlice);
    console.log(data);
    const handleLeaveRoom = async () => {
        if (data.rtcClient && data.localAudioTracks) {
            data.rtcClient.unpublish();
            data.rtcClient.leave();
            data.localAudioTracks.stop();
            data.localAudioTracks.close();
            alert("Leaved");
            navigato("/");
        }
    }
    const handleCopy = async () => {
        try {
            window.navigator.clipboard.writeText(`http://localhost:5173/call?roomName=${data.roomId}`);
            alert("Copied");

        } catch (error) {
            alert("Error Copy Failed");
        }
    }
    return (
        <div className='h-screen gap-5 bg-primary relative flex flex-wrap justify-center items-center'>
            <div className='md:h-72 h-28 w-32 md:w-96 rounded-xl border text-2xl md:text-7xl items-center justify-around text-white flex flex-col' id="self">
                <i className="fa-solid fa-user"></i>
                <p>Me</p>
            </div>
            {data && Object.entries(data?.connectedUsers).map(([key], idx: number) => {
                return <div className='md:h-72 h-28 w-32 md:w-96 rounded-xl border text-2xl md:text-7xl items-center justify-around text-white flex flex-col' id={key}>
                    <i className="fa-solid fa-user"></i>
                    User {idx + 1}
                </div>
            })}
            {show && <div className='absolute bg-white left-2 bottom-10  text-black p-2 rounded'>
                <button onClick={handleCopy}>Copy Link</button>
            </div>}
            <div className='buttons flex w-72 items-center justify-around gap-3 min-h-20  absolute bottom-7 text-white  '>
                <div onClick={handleLeaveRoom} className='flex flex-col bg-slate-800 md:w-44 rounded items-center justify-around h-20 p-3'>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <p>Exit</p>
                </div>


            </div>
        </div>
    )
}

export default Dashboard
