import React from "react";
import Wrapper from "./Wrapper"
interface Feature {
    icon: string;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: "smart_toy",
        title: "AI Quiz Generation",
        description:
            "Our intelligent AI creates relevant and challenging quiz questions from any topic in seconds.",
    },
    {
        icon: "monitoring",
        title: "Performance Analytics",
        description:
            "Track user performance, identify knowledge gaps, and view insightful charts to improve learning outcomes.",
    },
    {
        icon: "verified_user",
        title: "Secure Authentication",
        description:
            "Rest assured knowing your quizzes and performance data are protected with our robust and secure auth system.",
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <Wrapper>
            <section className="flex flex-col gap-10 px-4 py-10 text-center">
                <div className="flex flex-col gap-4">
                    <h1 className="text-white text-4xl font-bold">
                        How It Works
                    </h1>
                    <p className="text-[#9292c9] text-base max-w-[720px] mx-auto">
                        Discover the core features that make QuizAI the most
                        powerful and intuitive quiz generation platform.
                    </p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-4 p-6 rounded-xl glassmorphism hover:border-primary transition-all duration-300"
                        >
                            <div className="text-primary">
                                <span className="material-symbols-outlined !text-3xl">
                                    {f.icon}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-white text-lg font-bold">
                                    {f.title}
                                </h2>
                                <p className="text-[#9292c9] text-sm">
                                    {f.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Wrapper>
    );
};

export default FeaturesSection;
