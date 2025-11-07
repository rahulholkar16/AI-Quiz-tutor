import React from "react";
import QuizForm from "../components/QuizForm";
import QuizQuestion from "../components/QuizQuestion";
import { useAppSelector } from "../store/hook";

const CreateQuizPage: React.FC = () => {
    const { currentQuiz } = useAppSelector((s) => s.quiz);

    return (
        <div className="bg-[#0f0f25] text-white/90 font-display min-h-screen flex flex-col">
            <main className="flex-1 px-6 py-10 max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Create a New Quiz
                    </h1>
                    <p className="text-base text-white/60 mt-2 max-w-2xl mx-auto">
                        Enter a topic, select a quiz type, and let AI generate
                        your quiz.
                    </p>
                </div>

                <QuizForm />

                {currentQuiz && (
                    <>
                        <h3 className="mt-12 text-3xl font-bold">
                            Generated Quiz — {currentQuiz.topic}
                        </h3>
                        <div className="mt-8 flex flex-col gap-8">
                            {currentQuiz.questions.map((q, i) => (
                                <QuizQuestion
                                    key={i}
                                    type={q.type || currentQuiz.quizType}
                                    title={`Question ${i + 1}`}
                                    question={q.question || ""}
                                    defectCode={q.errorCode}
                                    options={q.options || []}
                                    correctAnswer={q.correctAnswer}
                                    explanation={q.explanation}
                                />
                            ))}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default CreateQuizPage;
