import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/slices/authSlice";
import quizReducer from "./slices/quizSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        quiz: quizReducer,
    },
});

// ✅ These types make everything work with useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
