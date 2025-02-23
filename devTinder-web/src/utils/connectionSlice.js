import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connection",
    initialState:null, 
    reducers:{
        addConnection:(state, actions) => actions.payload, 
        removeConnection:(state, actions) => null
    }
})

export const  { addConnection , removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer; 