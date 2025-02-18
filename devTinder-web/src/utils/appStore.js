import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlicer.js";

export const appStore = configureStore({
    reducer:{
        user: userReducer
    },
})