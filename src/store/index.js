import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import modalsSlice from "./slices/modal.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modals: modalsSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
})

export default store;