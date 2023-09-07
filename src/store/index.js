import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/user/loginSlice';
const store = configureStore({
  reducer: {
    authenticate: loginSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});

export default store;
