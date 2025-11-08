import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// types
interface Question {
  type: "mcq" | "fillup" | "codeerror";
  question: string;
  options?: Array<{ id?: string; text?: string } | string>;
  correctAnswer: any;
}

const sampleQuiz: Question[] = [
  {
    type: "mcq",
    question: "Which keyword is used to declare a variable that can be reassigned?",
    options: ["var", "let", "const", "function"],
    correctAnswer: "let",
  },
  {
    type: "fillup",
    question: "What is the output of typeof null?",
    correctAnswer: "object",
  },
  {
    type: "codeerror",
    question:
      "Find the issue: The function always returns true.\nfunction check(x){ if(x=5) return true; else return false; }",
    correctAnswer: "===",
  },
];

// util functions
const getAnswerText = (a: any): string => {
  if (a == null) return "";
  if (typeof a === "string" || typeof a === "number") return String(a);
  if (typeof a === "object") {
    return a.text ?? a.answer ?? a.id ?? a._id ?? JSON.stringify(a);
  }
  return JSON.stringify(a);
};

const normalize = (s: string) =>
  s.replace(/\r\n/g, "\n").replace(/\s+/g, " ").trim().toLowerCase();

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleSelect = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    const total = sampleQuiz.length;
    const answered = Object.keys(answers).length;

    if (answered < total) {
      alert("⚠️ Please answer all questions before submitting.");
      return;
    }

    let score = 0;

    sampleQuiz.forEach((q, i) => {
      const user = normalize(getAnswerText(answers[i]));
      const correct = normalize(getAnswerText(q.correctAnswer));

      if (q.type === "mcq") {
        if (user === correct) score++;
      } else if (q.type === "fillup") {
        if (user === correct) score++;
      } else if (q.type === "codeerror") {
        if (user.includes(correct)) score++;
      }
    });

    navigate("/result", { state: { score, total } });
  };

  return (
    <div className="min-h-screen bg-[#0f0f25] text-white font-display px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Quiz</h1>

      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        {sampleQuiz.map((q, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-6 rounded-2xl"
          >
            <h3 className="text-lg font-semibold mb-4">
              Q{i + 1}. {q.question}
            </h3>

            {q.type === "mcq" && (
              <div className="flex flex-col gap-3">
                {q.options?.map((opt, idx) => {
                  const val = getAnswerText(opt);
                  return (
                    <label
                      key={idx}
                      className={`cursor-pointer rounded-xl px-4 py-2 border transition ${
                        answers[i] === val
                          ? "bg-[#2b2bee] border-[#2b2bee]"
                          : "bg-[#0f0f25] border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <input
                        type="radio"
                        className="hidden"
                        name={`q-${i}`}
                        value={val}
                        checked={answers[i] === val}
                        onChange={() => handleSelect(i, val)}
                      />
                      {val}
                    </label>
                  );
                })}
              </div>
            )}

            {q.type === "fillup" && (
              <input
                type="text"
                className="mt-2 w-full bg-[#1b1b3a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#2b2bee]"
                placeholder="Type your answer..."
                value={answers[i] || ""}
                onChange={(e) => handleSelect(i, e.target.value)}
              />
            )}

            {q.type === "codeerror" && (
              <textarea
                className="mt-2 w-full bg-[#1b1b3a] border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-[#2b2bee] h-32"
                placeholder="Write your corrected code or fix..."
                value={answers[i] || ""}
                onChange={(e) => handleSelect(i, e.target.value)}
              />
            )}
          </div>
        ))}

        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            className="bg-[#2b2bee] px-6 py-3 rounded-xl font-semibold hover:bg-[#2b2bee]/80 transition"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
