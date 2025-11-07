import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { createQuiz } from "../store/quizThunks";

const QuizForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((s) => s.quiz);

    const [topic, setTopic] = useState("");
    const [quizType, setQuizType] = useState<"mcq" | "fillup" | "codeerror">(
        "mcq"
    );
    const [questionNo, setQuestionNo] = useState<number>(5); // ✅ added back

    const handleGenerateQuiz = async () => {
        if (!topic.trim()) return alert("Please enter a topic!");
        if (!questionNo || questionNo <= 0)
            return alert("Please enter a valid number of questions!");

        const payload = { topic, quizType, questionNo };
        console.log("📦 Sending Payload:", payload);

        await dispatch(createQuiz(payload));
    };

    return (
        <section className="mt-10 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm shadow-2xl shadow-[#2b2bee]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                {/* Topic */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-white/80 text-sm font-medium pb-2">
                        Topic
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                            quiz
                        </span>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., React Hooks, JavaScript ES6, Python Basics"
                            className="form-input w-full h-14 pl-11 pr-4 rounded-lg border border-white/20 bg-[#191933] text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#2b2bee]/50"
                        />
                    </div>
                </div>

                {/* Quiz Type */}
                <div className="flex flex-col">
                    <label className="text-white/80 text-sm font-medium pb-2">
                        Quiz Type
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                            category
                        </span>
                        <select
                            value={quizType}
                            onChange={(e) => setQuizType(e.target.value as any)}
                            className="form-select w-full h-14 pl-11 pr-4 rounded-lg border border-white/20 bg-[#191933] text-white focus:ring-2 focus:ring-[#2b2bee]/50"
                        >
                            <option value="mcq">Multiple Choice</option>
                            <option value="fillup">Fill in the Blanks</option>
                            <option value="codeerror">
                                Code Error Debugging
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ✅ Number of Questions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="flex flex-col md:col-span-1">
                    <label className="text-white/80 text-sm font-medium pb-2">
                        Number of Questions
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/30">
                            format_list_numbered
                        </span>
                        <input
                            type="number"
                            min={1}
                            max={20}
                            value={questionNo}
                            onChange={(e) =>
                                setQuestionNo(Number(e.target.value))
                            }
                            placeholder="e.g., 5"
                            className="form-input w-full h-14 pl-11 pr-4 rounded-lg border border-white/20 bg-[#191933] text-white placeholder:text-white/40 focus:ring-2 focus:ring-[#2b2bee]/50"
                        />
                    </div>
                </div>
            </div>

            {/* Generate Button */}
            <button
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="mt-6 w-full h-14 rounded-lg bg-[#2b2bee] hover:bg-[#2b2bee]/90 text-white text-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2b2bee]/30 hover:shadow-xl transition-all"
            >
                {loading ? "Generating..." : "Generate Quiz"}
                <span className="material-symbols-outlined">auto_awesome</span>
            </button>

            {error && <p className="text-red-400 text-center mt-3">{error}</p>}
        </section>
    );
};

export default QuizForm;
