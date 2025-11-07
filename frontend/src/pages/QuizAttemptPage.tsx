import React from "react";
import QuizAttempt from "../components/QuizAttempt";
import QuizSidebar from "../components/QuizSidebar";

const QuizAttemptPage: React.FC = () => {
    return (
        <main className="flex flex-col lg:flex-row gap-8 px-4 py-10 max-w-7xl mx-auto w-full grow">
            <QuizAttempt />
            <QuizSidebar />
        </main>
    );
};

export default QuizAttemptPage;
