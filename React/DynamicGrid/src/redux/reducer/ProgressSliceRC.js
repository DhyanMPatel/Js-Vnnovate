import { createSlice } from "@reduxjs/toolkit";

const ProgressSlice = createSlice({
    name: "progress",
    initialState: {
        progress: 0
    },
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        }
    }
})

export const { setProgress } = ProgressSlice.actions;
export default ProgressSlice.reducer;