import { v4 as uuidv4 } from 'uuid';
const appId = import.meta.env.VITE_SOME_KEY as string;
const rtcUserId = uuidv4();
import AgoraRTC from 'agora-rtc-sdk-ng';

const token: string | null = null;


const calculateColor = (level: any) => {
    if (level < 30) return "green";
    if (level > 30 && level < 75) return "yellow";
    return "red";
}



export const StartRtc = async (channelName: string, userJoinCallBack: Function, userLeftCallback: Function) => {
    //@ts-ignore
    AgoraRTC.setParameter("AUDIO_VOLUME_INDICATION_INTERVAL", 200);
    const rtcClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    rtcClient.on("user-joined", (user) => {
        userJoinCallBack(user);
    });
    rtcClient.on("user-published", async (user, mediaType) => {
        await rtcClient.subscribe(user, mediaType);
        user.audioTrack?.play();
    })
    rtcClient.enableAudioVolumeIndicator();
    rtcClient.on("volume-indicator", (vol) => {
        vol.forEach((v) => {
            //@ts-ignore
            let id = String(v.uid);
            if (v.uid == rtcClient.uid) id = 'self';
            const item = document.getElementById(id);
            if (item) item.style.borderColor = calculateColor(v.level);

        });
    })
    rtcClient.on("user-left", (user) => userLeftCallback(user));
    await rtcClient.join(appId, channelName, token, rtcUserId);
    const audioTracks = await AgoraRTC.createMicrophoneAudioTrack();
    rtcClient.publish(audioTracks);
    return { rtcClient, audioTracks };

}





