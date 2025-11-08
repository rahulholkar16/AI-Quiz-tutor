import React from "react";
import { ArrowRight } from "lucide-react";

interface DetailedReportProps {
  score: number;
  correct: number;
  wrong: number;
}

const DetailedReportCard: React.FC<DetailedReportProps> = ({
  score,
  correct,
  wrong,
}) => {
  const dashArray = `${score}, 100`;

  return (
    <div className="relative overflow-hidden flex flex-col gap-4 rounded-xl p-6 border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
      <div className="absolute -top-10 -right-10 h-32 w-32 bg-[#2b2bee]/20 rounded-full blur-2xl"></div>

      <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
        Current Quiz Summary
      </h2>

      {/* Circular Progress */}
      <div className="flex items-center gap-6">
        <div className="relative h-36 w-36">
          <svg className="h-full w-full" viewBox="0 0 36 36">
            <circle
              className="stroke-current text-white/10"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeWidth="3"
            />
            <circle
              className="stroke-current text-[#2b2bee] transition-all duration-500"
              cx="18"
              cy="18"
              fill="none"
              r="16"
              strokeDasharray={dashArray}
              strokeDashoffset="-15"
              strokeLinecap="round"
              strokeWidth="3"
              transform="rotate(-90 18 18)"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-white text-3xl font-bold">{score}%</p>
            <p className="text-white/60 text-sm">Accuracy</p>
          </div>
        </div>

        {/* Correct vs Wrong */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#2b2bee]" />
            <div>
              <p className="text-white font-medium">{correct} Correct</p>
              <p className="text-white/60 text-xs">Well done!</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#fa6938]" />
            <div>
              <p className="text-white font-medium">{wrong} Wrong</p>
              <p className="text-white/60 text-xs">Keep practicing</p>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2b2bee] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2b2bee]/90"
      >
        View Detailed Report
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
};

export default DetailedReportCard;
