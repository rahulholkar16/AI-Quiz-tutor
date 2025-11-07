import React from "react";

const QuizAttempt: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full lg:w-2/3">
      <div className="flex items-baseline justify-between flex-wrap gap-4">
        <h1 className="text-4xl font-black tracking-tight">React Hooks Mastery</h1>
      </div>

      <div className="flex flex-col rounded-xl border border-white/10 bg-white/5 shadow-xl">
        <div className="relative overflow-hidden rounded-t-xl bg-linear-to-br from-primary/20 via-background-dark to-background-dark p-6">
          <div className="relative z-10 flex flex-col gap-2">
            <p className="text-sm font-medium text-primary">Question 3 of 10</p>
            <p className="text-2xl sm:text-3xl font-bold">
              What is the primary purpose of the <code>useEffect</code> hook in React?
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          {[
            "To manage state within a functional component.",
            "To perform side effects in functional components.",
            "To create context for sharing data.",
            "To optimize rendering performance with memoization.",
          ].map((option, i) => (
            <div
              key={i}
              className={`group flex items-start gap-4 rounded-lg border-2 p-4 cursor-pointer transition-all duration-200 ${
                i === 1
                  ? "border-primary/50 bg-primary/20 ring-2 ring-primary"
                  : "border-white/10 bg-white/5 hover:border-primary/50 hover:bg-primary/10"
              }`}
            >
              <div
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  i === 1
                    ? "border-primary bg-background-dark"
                    : "border-white/30 bg-background-dark group-hover:border-primary"
                }`}
              >
                {i === 1 && <div className="size-3 rounded-full bg-primary" />}
              </div>
              <p
                className={`text-base font-medium ${
                  i === 1 ? "text-white" : "text-white/80 group-hover:text-white"
                }`}
              >
                {option}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;