import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveFormData: (state, action) => {
      state.formData = action.payload;
    },
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
  },
});

export const { saveFormData, updateFormField } = userSlice.actions;
export default userSlice.reducer;
