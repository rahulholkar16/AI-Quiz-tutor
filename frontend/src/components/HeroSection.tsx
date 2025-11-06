import React from "react";
import Wrapper from "./Wrapper"
const HeroSection: React.FC = () => {
    return (
        <Wrapper>
            <section className="mt-10 px-4 py-10 flex flex-col gap-8 md:flex-row md:items-center">
                <div className="flex flex-col gap-6 @[480px]:min-w-[400px] @[480px]:gap-8 @[864px]:flex-1">
                    <div className="flex flex-col gap-4 text-left">
                        <h1 className="text-white text-4xl font-black leading-tight @[480px]:text-5xl">
                            Create Engaging Quizzes in Seconds with AI
                        </h1>
                        <h2 className="text-[#9292c9] text-sm @[480px]:text-base">
                            The ultimate tool for educators, trainers, and
                            developers to effortlessly generate insightful
                            quizzes on any topic.
                        </h2>
                    </div>
                    <button className="flex items-center justify-center h-12 px-5 bg-[#2b2bee] text-white font-bold rounded-lg hover:bg-opacity-80 transition-all duration-300">
                        Get Started Now
                    </button>
                </div>

                <div
                    className="w-full aspect-video bg-center bg-cover rounded-xl @[480px]:min-w-[400px] @[864px]:flex-1"
                    style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPqTUacqgjALNfMkUTglmxALVk8gmLv8RwPy-edUoMq18g6SrJ-bTWuaN5_w0Sxh0m82HpsaE8mtQAitVWBLeXcbrf8_9E-c0jkKELk638JKBeo-R-sabL7snedCne5RmYWIeObMa-QNqnb0V-1e7Sy3A-dHV9WBa-7m1LplC_K-pz3571-hVJoY7fy6Sh_pXv8kz-Hh1siORKXhAJvM8MYwFcSkFrFt93nSjaqRFmZ04nGatcFIPTz_Z-PNbVkEHcUvS2gg3BCMs")`,
                    }}
                />
            </section>
        </Wrapper>
    );
};

export default HeroSection;
