import { createSlice } from "@reduxjs/toolkit";

const GridDataSlice = createSlice({
    name: "gridData",
    initialState: {
        gridData: {},
    },
    reducers: {
        updateRowData: (state, action) => {
            const { rowIndex, newData } = action.payload;
            state.gridData[rowIndex] = newData;
        }
    }
})
export const { updateRowData } = GridDataSlice.actions;
export default GridDataSlice.reducer;