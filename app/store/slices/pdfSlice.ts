'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a serializable file representation
interface FileMetadata {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface PdfState {
  fileMetadata: FileMetadata | null;
  fileURL: string | null;
}

const initialState: PdfState = {
  fileMetadata: null,
  fileURL: null,
};

export const pdfSlice = createSlice({
  name: 'pdf',
  initialState,
  reducers: {
    setFiles: (
      state,
      action: PayloadAction<{ fileMetadata: FileMetadata; fileURL: string }>
    ) => {
      // Store serializable metadata and URL
      state.fileMetadata = action.payload.fileMetadata;
      state.fileURL = action.payload.fileURL;
    },
    clearFiles: (state) => {
      // Clean up the URL object to prevent memory leaks
      if (state.fileURL) {
        URL.revokeObjectURL(state.fileURL);
      }
      state.fileMetadata = null;
      state.fileURL = null;
    },
  },
});

export const { setFiles, clearFiles } = pdfSlice.actions;

export default pdfSlice.reducer;
