import { createReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUIState } from "../../types";

const initialState: IUIState = {
  isModalOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalState: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    }
  }
});


export const { setModalState } = uiSlice.actions;
export const uiInitial = uiSlice.getInitialState();
export const uiReducer = uiSlice.reducer;
