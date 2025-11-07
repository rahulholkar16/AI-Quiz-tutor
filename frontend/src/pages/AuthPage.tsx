import React, { useState } from "react";
import Register from "../components/Register";
import Login from "../components/Login";
import Wrapper from "../components/Wrapper";

export type AuthView = "login" | "signup" | "forgot" | "reset";

const AuthPage: React.FC = () => {
     const [view, setView] = useState<AuthView>("login");
    return (
        <Wrapper>
            <div className="font-display bg-background-light dark:bg-background-dark text-text-primary min-h-screen flex flex-col relative">
                <div className="absolute inset-0 -z-10">
                    <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]" />
                    <div className="absolute bottom-[-20%] right-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,128,255,.15),rgba(255,255,255,0))]" />
                </div>

                <main className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8">
                    {view == "signup" && <Register setView={setView}/> }
                    {view == "login" && <Login setView={setView} />}
                </main>
            </div>
        </Wrapper>
    );
};

export default AuthPage;
