import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useAppSelector } from "../store/hook";

const AccountSettings: React.FC = () => {
    const { isAuthenticated, user } = useAppSelector((s) => s.auth);
    const [ view, setView ] = useState(false)
    
    useEffect(() => {
        setView(isAuthenticated)
    }, [isAuthenticated])

    return (
        (view ?
        <Wrapper>
            <main className="flex flex-1 justify-center py-4 px-4 bg-[#101022] text-white font-[Space Grotesk sans-serif] min-h-screen">
                <div className="w-full max-w-6xl flex flex-col gap-8">
                    <div className="flex flex-col gap-2 p-4">
                        <h1 className="text-4xl font-black">
                            Profile & Settings
                        </h1>
                        <p className="text-gray-400">
                            Manage your account details, preferences, and
                            security settings.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* LEFT COLUMN */}
                        <div className="flex flex-col gap-8">
                            <div className="bg-[#101022] relative border border-white/10 rounded-xl p-6 flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div
                                        className="w-24 h-24 bg-center bg-cover rounded-full border-2 border-[#2b2bee]"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB9TB5dG7ebYPF8canV-FHXqDmOWCyly4NYMvLEOCjF0_3JFgH9nzYOJHSl0y8Am7RRLgBAHbsOhWbqMFjFtBJM8u4lZK9f4Mf16ld5SCRULuezyl9qSRjgzHjbRDSfg_USXpyotU0rcuCOPsAwPogMmd9qs-BGQeMG5MeuhBn4OWK_7xSEQtS2Fkttk6bqbSChvGaTmEXNj2mgKLF9BZwZx6XqMhEe9mQjJNpSLaM2bKY2aE-Xh1k56uYn8AeMKYAZ8dWLexr0DyI")',
                                        }}
                                    ></div>
                                    <button className="absolute -bottom-1 -right-1 bg-gray-700 hover:bg-gray-600 rounded-full p-2 border-2 border-[#101022]">
                                        <span className="material-symbols-outlined text-white text-sm">
                                            edit
                                        </span>
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold">{user?.name}</h2>
                                <p className="text-gray-400 text-sm mt-1">
                                    {user?.email}
                                </p>
                                
                            </div>

                            <div className="bg-[#101022] border border-white/10 rounded-xl p-6">
                                <h3 className="text-lg font-bold mb-4">
                                    Preferences
                                </h3>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-gray-300 text-sm">
                                            Theme
                                        </label>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span className="material-symbols-outlined text-base">
                                                light_mode
                                            </span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    defaultChecked
                                                    className="sr-only peer"
                                                />
                                                <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-checked:bg-[#2b2bee] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                                            </label>
                                            <span className="material-symbols-outlined text-base">
                                                dark_mode
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <label className="text-gray-300 text-sm">
                                            Email Notifications
                                        </label>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="sr-only peer"
                                            />
                                            <div className="w-9 h-5 bg-gray-600 rounded-full peer peer-checked:bg-[#2b2bee] after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex flex-col gap-8 w-lg">
                            {/* Change Password */}
                            <div className="bg-[#101022] border border-white/10 rounded-xl">
                                <form className="flex flex-col gap-6 p-6">
                                    <h3 className="text-lg font-bold">
                                        Change Password
                                    </h3>
                                    {["Current", "New", "Confirm"].map(
                                        (label, idx) => (
                                            <div
                                                key={idx}
                                                className="flex flex-col gap-2"
                                            >
                                                <label className="text-sm font-medium text-gray-300">
                                                    {label} Password
                                                </label>
                                                <div className="relative">
                                                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                        lock
                                                    </span>
                                                    <input
                                                        type="password"
                                                        placeholder={
                                                            "Enter your ${label.toLowerCase()} password"
                                                        }
                                                        className="w-full rounded-lg border border-white/10 bg-white/5 p-3 pl-10 text-white placeholder-gray-500 focus:border-[#2b2bee] focus:ring-[#2b2bee]"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                                    >
                                                        <span className="material-symbols-outlined text-xl">
                                                            visibility_off
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    )}

                                    <div className="mt-2 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-lg bg-[#2b2bee] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2b2bee]/90"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Activity */}
                            <div className="bg-[#101022] border border-white/10 rounded-xl p-6">
                                <h3 className="text-lg font-bold mb-4">
                                    Recent Activity
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start space-x-3">
                                        <div className="h-5 w-5 bg-[#2b2bee] rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-xs">
                                                quiz
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-300">
                                            Generated new quiz:{" "}
                                            <span className="font-medium text-white">
                                                "React Hooks Advanced"
                                            </span>
                                        </p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <div className="h-5 w-5 bg-gray-500 rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-xs">
                                                lock
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-300">
                                            Successfully updated password
                                        </p>
                                    </li>

                                    <li className="flex items-start space-x-3">
                                        <div className="h-5 w-5 bg-[#2b2bee] rounded-full flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-xs">
                                                analytics
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-300">
                                            Viewed analytics for quiz:{" "}
                                            <span className="font-medium text-white">
                                                "JavaScript Fundamentals"
                                            </span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Wrapper> : "Please login....") 
    );
};

export default AccountSettings;
