import React, { useState, type Dispatch, type SetStateAction } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { registerUser } from "../store/authThunks";
import Button from "./Button";
import type { AuthView } from "../pages/AuthPage";

interface SignupProps {
    setView: Dispatch<SetStateAction<AuthView>>;
}

const Register: React.FC<SignupProps> = ({ setView }) => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((s) => s.auth);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        organizationName: "Other",
    });

    const handleRegister = async () => {

        if (!form.name || !form.email || !form.password) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            await dispatch(registerUser(form)).unwrap();
            alert(
                "Registration successful! Check your email for verification."
            );
            setView("login");
        } catch (err) {
            alert(err || "Registration failed!");
        }
    };

    return (
        <div className="relative z-10 w-full max-w-md animate-fadeIn">
            <div className="w-full rounded-xl border border-[#323267] bg-glass p-6 sm:p-8">
                <div className="flex flex-col gap-6 text-center">
                    <h1 className="text-3xl font-bold sm:text-4xl text-[#ffffff]">
                        Create an Account
                    </h1>
                    <p className="text-[#9292c9]">
                        Start generating quizzes in seconds.
                    </p>

                    <div
                        className="flex flex-col gap-4"
                    >
                        <input
                            type="text"
                            placeholder="Your full name"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="h-14 rounded-lg border border-[#323267] bg-[#191933] p-4 placeholder:text-[#9292c9] focus:ring-2 focus:ring-[#4f46e5]/50"
                        />

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className="h-14 rounded-lg border border-[#323267] bg-[#191933] p-4 placeholder:text-[#9292c9] focus:ring-2 focus:ring-[#4f46e5]/50"
                        />

                        <input
                            type="password"
                            placeholder="Create a strong password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="h-14 rounded-lg border border-[#323267] bg-[#191933] p-4 placeholder:text-[#9292c9] focus:ring-2 focus:ring-[#4f46e5]/50"
                        />

                        {/* optional org input */}
                        <input
                            type="text"
                            placeholder="Organization name (default: Other)"
                            value={form.organizationName}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    organizationName: e.target.value,
                                })
                            }
                            className="h-14 rounded-lg border border-[#323267] bg-[#191933] p-4 placeholder:text-[#9292c9] focus:ring-2 focus:ring-[#4f46e5]/50"
                        />

                        <Button
                            onClick={handleRegister}
                            disabled={loading}
                            className="h-14 rounded-lg bg-[#4f46e5] font-bold text-white hover:bg-[#4f46e5]/90 focus:ring-4 focus:ring-[#4f46e5]/50 disabled:opacity-60"
                        >
                            {loading ? "Creating..." : "Create Account"}
                        </Button>

                        <p className="text-sm text-[#9292c9]">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setView("login")}
                                className="font-medium text-[#4f46e5] hover:underline"
                            >
                                Sign In
                            </button>
                        </p>

                        {error && (
                            <p className="text-center text-red-400 font-medium text-sm mt-2">
                                {error}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
