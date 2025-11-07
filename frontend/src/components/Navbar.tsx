import React from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { logoutUser } from "../store/authThunks";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user } = useAppSelector((s) => s.auth);

    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/auth"); // redirect to login page
    };

    return (
        <header className="flex items-center justify-between border-b border-solid border-b-[#232348] px-4 sm:px-10 py-3 bg-[#0f0f25]">
            {/* Logo */}
            <div
                className="flex items-center gap-3 text-white cursor-pointer"
                onClick={() => navigate("/")}
            >
                <span className="material-symbols-outlined text-4xl text-[#2b2bee]">
                    quiz
                </span>
                <h2 className="text-white text-xl font-bold">QuizAI</h2>
            </div>

            {/* Navigation */}
            <div className="flex flex-1 justify-end items-center gap-6 md:gap-8">
                {!isAuthenticated ? (
                    // 🔹 When NOT logged in
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/auth?view=login")}
                            className="text-white text-sm font-medium hover:text-[#2b2bee] transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/auth?view=signup")}
                            className="bg-[#2b2bee] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#4040ee] transition"
                        >
                            Sign Up
                        </button>
                    </div>
                ) : (
                    // 🔹 When logged in
                    <>
                        <nav className="hidden md:flex items-center gap-8">
                            <button
                                onClick={() => navigate("/")}
                                className="text-white text-sm font-medium hover:text-[#2b2bee] transition-colors"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => navigate("/generate")}
                                className="text-white text-sm font-medium hover:text-[#2b2bee] transition-colors"
                            >
                                Generate Quiz
                            </button>
                            <button
                                onClick={() => navigate("/performance")}
                                className="text-white text-sm font-medium hover:text-[#2b2bee] transition-colors"
                            >
                                My Performance
                            </button>
                        </nav>

                        {/* User avatar + dropdown */}
                        <div className="relative group">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full size-10 cursor-pointer"
                                style={{
                                    backgroundImage: `url(${
                                        
                                        "https://api.dicebear.com/9.x/identicon/svg?seed=" +
                                            user?.name
                                    })`,
                                }}
                            />
                            <div className="absolute right-0 mt-2 w-36 rounded-lg bg-[#191933] text-white text-sm font-medium hidden group-hover:block shadow-lg border border-[#323267]">
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="block w-full px-4 py-2 text-left hover:bg-[#232348]"
                                >
                                    Dashboard
                                </button>
                                <button
                                    onClick={() => handleLogout()}
                                    className="block w-full px-4 py-2 text-left text-red-400 hover:bg-[#232348]"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default Navbar;
