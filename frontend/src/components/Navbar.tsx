import React from "react";

const Navbar: React.FC = () => {
    return (
        <header className="flex items-center justify-between border-b border-solid border-b-[#232348] px-2 sm:px-10 py-3">
            <div className="flex items-center gap-4 text-white">
                <div className="size-6 text-[#2b2bee]">
                    <span className="material-symbols-outlined text-4xl">
                        quiz
                    </span>
                </div>
                <h2 className="text-white text-xl font-bold">QuizAI</h2>
            </div>

            <div className="flex flex-1 justify-end items-center gap-4 md:gap-8">
                <div className="hidden md:flex items-center gap-9">
                    <a
                        className="text-white text-sm font-medium hover:text-[#2b2bee] transition-colors"
                        href="#"
                    >
                        Home
                    </a>
                    <a
                        className="text-white text-sm font-medium hover:text-[#2b2bee] transition-colors"
                        href="#"
                    >
                        Generate Quiz
                    </a>
                    <a
                        className="text-white text-sm font-medium hover:text-[#2b2bee] transition-colors"
                        href="#"
                    >
                        My Performance
                    </a>
                </div>

                <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-10"
                    style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDES3qRZkpoB6z8Je1X4p9vfvNLTZqxPkzjTa-ZHevXjdxYL_ywhiAQzdJd92rrJu9tAKZK0kReD4Jl9gvWlA7TatMdIgaS8b7qxaoihMog5TusvrXa0UC27YGzvEULKyX5q16Ht_aN5wJpU3JNEN-uRbKOEFj-YuuuvIHHppcJSnBCL9Cvq4Ip2MJqJXnSCn50ouXG6eJk0FYoEpa-b2XNDxdeYHxLjGFj0de6AYrkCWVtzXhE5FcFfC_4Yfzd3JuVT8xwjQcrKJY")`,
                    }}
                />
            </div>
        </header>
    );
};

export default Navbar;
