import { configureStore } from "@reduxjs/toolkit";
import CallSlice from "./CallSlice";


export const store = configureStore({
    reducer: { CallSlice },
}); 