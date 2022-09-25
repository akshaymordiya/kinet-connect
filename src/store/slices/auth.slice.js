import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isProfileActivated: false,
  user: null,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    markUserAuthenticated: (state, { payload }) => ({...state, isAuthenticated: payload }),
    markUserProfileActivated: (state, { payload }) => ({...state, isProfileActivated: payload}),
    setUserData: (state, { payload }) => ({...state, user : payload}),
  }
})

export const { 
  markUserAuthenticated,
  markUserProfileActivated, 
  setUserData,
} = auth.actions;

export default auth.reducer