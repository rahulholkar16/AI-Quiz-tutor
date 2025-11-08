import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  const wrong = total - score;

  const getMessage = () => {
    if (accuracy === 100) return "Perfect! You nailed every question 🎯";
    if (accuracy >= 80) return "Excellent job! Keep up the great work 💪";
    if (accuracy >= 60) return "Good effort! Review a few more topics 👀";
    return "Don’t worry, practice makes perfect! 💡";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f0f25] text-white px-6 py-10">
      <div className="relative max-w-md w-full bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-10 text-center">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#2b2bee]/30 blur-3xl rounded-full opacity-70" />

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
          Quiz Result
        </h1>
        <p className="text-white/70 mb-8">{getMessage()}</p>

        {/* Circular progress */}
        <div className="relative mx-auto mb-8 w-48 h-48">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="18"
              cy="18"
              r="16"
              stroke="#2b2bee"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${accuracy}, 100`}
              strokeDashoffset="-15"
              transform="rotate(-90 18 18)"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black">{accuracy}%</span>
            <span className="text-sm text-white/70">Accuracy</span>
          </div>
        </div>

        {/* Correct / Wrong */}
        <div className="flex justify-center gap-10 mb-10">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-[#0bda68]" size={22} />
            <div className="text-left">
              <p className="font-bold text-lg">{score}</p>
              <p className="text-xs text-white/60">Correct</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <XCircle className="text-[#fa6938]" size={22} />
            <div className="text-left">
              <p className="font-bold text-lg">{wrong}</p>
              <p className="text-xs text-white/60">Wrong</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-lg bg-[#2b2bee] hover:bg-[#2b2bee]/90 transition-all font-semibold flex items-center gap-2"
          >
            Go Home
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate("/create-quiz")}
            className="px-6 py-2.5 rounded-lg bg-transparent border border-white/10 hover:bg-white/5 transition-all font-semibold text-white/90"
          >
            Try Again
          </button>
        </div>
      </div>

      <p className="text-white/40 text-sm mt-8">
        Keep practicing — each quiz makes you smarter 💡
      </p>
    </div>
  );
};

export default ResultPage;
