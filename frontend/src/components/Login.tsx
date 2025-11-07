import React, { useState, type Dispatch, type SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook"
import { loginUser } from "../store/authThunks";
import type { AuthView } from "../pages/AuthPage";
import Button from "./Button";
import { useNavigate } from "react-router";

interface LoginProps {
    setView: Dispatch<SetStateAction<AuthView>>;
}

const Login: React.FC<LoginProps> = ({ setView }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((s) => s.auth);

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {

        if (!form.email || !form.password) {
            alert("Please fill all fields.");
            return;
        }

        try {
            const res = await dispatch(
                loginUser({ email: form.email, password: form.password })
            ).unwrap();
            if (res.email) navigate("/")
        } catch (err) {
            alert(err || "Login failed!");
        }
    };

    return (
        <div className="rounded-xl w-full sm:w-1/2 border border-[#323267] bg-glass p-6 sm:p-8">
            <div className="flex flex-col gap-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold sm:text-4xl">
                        Welcome Back
                    </h1>
                    <p className="text-[#9292c9] text-base">
                        Sign in to continue to your dashboard.
                    </p>
                </div>

                <div className="flex flex-col gap-4" >
                    {/* Email */}
                    <label htmlFor="email-login" className="flex flex-col">
                        <p className="pb-2 font-medium">Email</p>
                        <input
                            id="email-login"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className="form-input w-full h-14 rounded-lg border border-[#323267] bg-[#191933] p-4 text-base placeholder:text-[#9292c9] focus:ring-2 focus:ring-[#4f46e5]/50"
                        />
                    </label>

                    {/* Password */}
                    <label htmlFor="password-login" className="flex flex-col">
                        <p className="pb-2 font-medium">Password</p>
                        <div className="flex w-full items-stretch">
                            <input
                                id="password-login"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                                className="form-input flex-1 h-14 rounded-l-lg border border-[#323267] bg-[#191933] p-4 pr-2 border-r-0 placeholder:text-[#9292c9] focus:ring-2 focus:ring-[#4f46e5]/50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="flex items-center justify-center rounded-r-lg border border-[#323267] border-l-0 bg-[#191933] px-4 text-[#9292c9] hover:text-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/50"
                            >
                                <span className="material-symbols-outlined text-2xl">
                                    {showPassword
                                        ? "visibility_off"
                                        : "visibility"}
                                </span>
                            </button>
                        </div>
                    </label>

                    {/* Forgot Password */}
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => setView("forgot")}
                            className="text-sm text-[#9292c9] underline hover:text-[#4f46e5]"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Submit */}
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="h-14 rounded-lg bg-[#4f46e5] font-bold text-white hover:bg-[#4f46e5]/90 focus:ring-4 focus:ring-[#4f46e5]/50 disabled:opacity-60"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-2">
                        <div className="h-px flex-1 bg-[#323267]" />
                        <p className="text-sm text-[#9292c9]">OR</p>
                        <div className="h-px flex-1 bg-[#323267]" />
                    </div>

                    {/* OAuth (Optional) */}
                    <button
                        type="button"
                        className="flex items-center justify-center gap-3 h-14 w-full rounded-lg border border-[#323267] bg-[#191933] font-medium text-white hover:bg-[#323267]/50 focus:ring-4 focus:ring-[#323267]/50"
                    >
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M12 2C6.477 2 2 6.477 2 12..."
                            />
                        </svg>
                        <span>Continue with GitHub</span>
                    </button>

                    {/* Switch to Sign Up */}
                    <p className="text-center text-sm text-[#9292c9]">
                        Don’t have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setView("signup")}
                            className="font-medium text-[#4f46e5] hover:underline"
                        >
                            Sign Up
                        </button>
                    </p>

                    {/* Error Message */}
                    {error && (
                        <p className="text-center text-red-400 font-medium text-sm mt-2">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;