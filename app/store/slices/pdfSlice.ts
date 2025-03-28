import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: null,
};

const pdfSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFiles: (state, action) => {
      state.file = action.payload;
    },
  },
});

export const { setFiles } = pdfSlice.actions;
export default pdfSlice.reducer;
