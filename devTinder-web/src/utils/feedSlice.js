import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState:null,
    reducers:{
        addFeed: (state , action) =>  action.payload,
        removeUserFeed: (state, action) => {
            const filterFeed = state.filter((item)=>item._id !== action.payload);
            return filterFeed;
        }
    }
})

export const {addFeed , removeUserFeed } = feedSlice.actions;
export default feedSlice.reducer;