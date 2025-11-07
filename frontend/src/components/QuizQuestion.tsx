import React from "react";
import Button from "./Button";

interface QuestionProps {
    type: "mcq" | "fillup" | "codeerror";
    title: string;
    question: string;
    defectCode?: string
    options?: string[];
    correctAnswer?: string;
    explanation?: string;
}

const QuizQuestion: React.FC<QuestionProps> = ({
    type,
    title,
    question,
    defectCode,
    options,
    correctAnswer,
    explanation,
}) => {
    return (
        <div className="border border-white/10 rounded-xl p-6 backdrop-blur-xl hover:bg-white/[.05] hover:border-white/20 transition-all">
            <p className="text-sm font-semibold text-[#2b2bee]">
                {title}
                <span className="text-white/40 ml-2 font-normal">
                    (
                    {type === "mcq"
                        ? "Multiple Choice"
                        : type === "fillup"
                        ? "Fill in the Blanks"
                        : "Code Error Debugging"}
                    )
                </span>
            </p>

            <p className="text-lg text-white font-medium mt-1">{question}</p>

            {/* MCQ */}
            {type === "mcq" && Array.isArray(options) && options.length > 0 && (
                <div className="flex flex-col gap-3 mt-3">
                    {options.map((opt: any, i) => {
                        const optionText =
                            typeof opt === "string" ? opt : opt.text;
                        return (
                            <label
                                key={opt.id || i}
                                className="group flex items-center gap-4 p-4 rounded-lg border border-white/10 bg-white/[.02] hover:bg-[#2b2bee]/10 hover:border-[#2b2bee] cursor-pointer transition-colors duration-200 has-[:checked]:bg-[#2b2bee]/20 has-[:checked]:border-[#2b2bee]"
                            >
                                <input
                                    type="radio"
                                    name={title}
                                    className="form-radio text-[#2b2bee] focus:ring-[#2b2bee]/50 size-5"
                                />
                                <span className="text-white/90 group-hover:text-white">
                                    {optionText}
                                </span>
                            </label>
                        );
                    })}
                </div>
            )}

            {/* Fillup */}
            {type === "fillup" && (
                <input
                    placeholder="Type your answer here..."
                    className="mt-3 form-input w-full h-12 rounded-lg border border-white/20 bg-[#191933] text-white px-4 placeholder:text-white/40 focus:ring-2 focus:ring-[#2b2bee]/50"
                />
            )}

            {/* Code Error */}
            {type === "codeerror" && (
                <>
                    <div className="bg-[#0d1117] p-4 rounded-lg mt-2 border border-white/10">
                        <pre className="text-sm text-white/90 font-mono whitespace-pre-wrap">
                            {defectCode}
                        </pre>
                    </div>
                    <textarea
                        placeholder="Describe the error and provide the corrected code..."
                        className="mt-3 form-textarea w-full min-h-32 rounded-lg border border-white/20 bg-[#191933] text-white p-4 font-mono placeholder:text-white/40 focus:ring-2 focus:ring-[#2b2bee]/50"
                    ></textarea>
                </>
            )}

            {correctAnswer && (
                <p className="mt-3 text-sm text-green-400">
                    ✅ Correct: <strong>{correctAnswer}</strong>
                </p>
            )}
            {explanation && (
                <p className="text-xs text-white/50 mt-1 italic">
                    {explanation}
                </p>
            )}

            <Button>
              
            </Button>
        </div>


    );
};

export default QuizQuestion;
