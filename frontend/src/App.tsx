import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import QuizAttemptPage from "./pages/QuizAttemptPage";
import AccountSettings from "./pages/ProfilePage";
import { useAppDispatch } from "./store/hook";
import { fetchCurrentUser } from "./store/authThunks";
import CreateQuizPage from "./pages/CreateQuiz";


const App: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        // 👇 Rehydrate the user from cookies on app load
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#101022] text-[#d1d1f7] overflow-x-hidden font-display">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/profile" element={< AccountSettings/>} />
                    <Route path="/attempt" element={<QuizAttemptPage />} />
                    <Route path="/create-quiz" element={<CreateQuizPage />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;
