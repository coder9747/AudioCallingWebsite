import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    roomId: "",
    localAudioTracks: null,
    rtcClient: null,
    connectedUsers: {},
}


const CallSlice = createSlice({
    name: "CallSlice",
    initialState,
    reducers: {
        updateCallState: (state, action) => {
            const { name, rtcClient, localAudioTracks } = action.payload;
            state.localAudioTracks = localAudioTracks;
            state.roomId = name;
            state.rtcClient = rtcClient;
        },
        updateUsers: (state, action) => {
            //@ts-ignore
            state.connectedUsers[action.payload.uid] = action.payload;
        },
        userLeft: (state, action) => {
            //@ts-ignore
            delete state.connectedUsers[action.payload.uid];
        }
    }
});

export const { updateCallState, updateUsers, userLeft } = CallSlice.actions;

export default CallSlice.reducer;