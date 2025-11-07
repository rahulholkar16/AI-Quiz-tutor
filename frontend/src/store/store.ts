import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// ✅ These types make everything work with useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
