import React from "react";
import { Timer, ListChecks } from "lucide-react";

const QuizSidebar: React.FC = () => {
    return (
        <div className="flex flex-col gap-6 lg:w-1/3 lg:sticky lg:top-28">
            {/* Timer */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                    <Timer className="text-primary" size={20} />
                    <h3 className="text-lg font-bold">Time Left</h3>
                </div>
                <p className="text-5xl font-black text-center drop-shadow-[0_2px_4px_rgba(43,43,238,0.4)]">
                    14:32
                </p>
            </div>

            {/* Progress */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                    <ListChecks className="text-primary" size={20} />
                    <h3 className="text-lg font-bold">Your Progress</h3>
                </div>
                <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">3 / 10 Answered</p>
                    <p className="text-sm text-white/60">30% Complete</p>
                </div>
                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-2.5 bg-linear-to-r from-primary/70 to-primary w-[30%]" />
                </div>

                {/* Number buttons */}
                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 pt-3">
                    {Array.from({ length: 10 }, (_, i) => (
                        <button
                            key={i}
                            className={`flex h-10 items-center justify-center rounded-md font-bold transition-colors ${
                                i < 3
                                    ? "border-2 border-primary bg-primary/20 hover:bg-primary/30"
                                    : "border border-white/20 bg-white/5 text-white/60 hover:bg-white/10"
                            } ${
                                i === 2
                                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background-dark"
                                    : ""
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizSidebar;
