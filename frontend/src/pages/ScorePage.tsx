import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swords, Target, ArrowRight } from "lucide-react";
import Leaderboard from "../components/LeaderBaord";
import PerformanceChart from "../components/PerformanceChart";

const ScorePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🎯 get user quiz data from navigation
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 0;
  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0;
  const wrong = total - score;

  return (
    <div className="min-h-screen bg-[#0f0f25] text-white font-display flex flex-col px-6 py-10">
      {/* Header */}
      <header className="max-w-7xl mx-auto w-full mb-10">
        <h1 className="text-4xl font-black">Score & Performance</h1>
        <p className="text-white/60 mt-1 text-base">
          Here’s your detailed performance breakdown for this quiz.
        </p>
      </header>

      {/* Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-[#2b2bee]/20 blur-2xl" />
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#2b2bee]/10 text-[#2b2bee]">
                  <Swords className="h-6 w-6" />
                </div>
                <p className="text-white/80 text-base font-medium">
                  Quizzes Taken
                </p>
              </div>
              <p className="text-white text-4xl font-bold">12</p>
              <p className="text-[#0bda68] text-sm font-medium">+2 this week</p>
            </div>

            <div className="relative flex flex-col gap-2 rounded-xl p-6 border border-white/10 bg-white/5 hover:bg-white/10 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 h-20 w-20 bg-sky-400/20 blur-2xl" />
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400">
                  <Target className="h-6 w-6" />
                </div>
                <p className="text-white/80 text-base font-medium">
                  Overall Accuracy
                </p>
              </div>
              <p className="text-white text-4xl font-bold">{accuracy}%</p>
              <p className="text-[#0bda68] text-sm font-medium">
                {score}/{total} correct
              </p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="flex flex-col gap-4 rounded-xl p-6 border border-white/10 bg-white/5">
            <h2 className="text-white text-[22px] font-bold">
              Performance Trend
            </h2>
            <div className="w-full h-72 flex items-center justify-center">
              <PerformanceChart />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 flex flex-col gap-8">
          {/* Detailed Report Card */}
          <div className="relative overflow-hidden flex flex-col gap-4 rounded-xl p-6 border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
            <div className="absolute -top-10 -right-10 h-32 w-32 bg-[#2b2bee]/20 rounded-full blur-2xl"></div>

            <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
              Current Quiz Summary
            </h2>

            <div className="flex items-center gap-6">
              {/* Circular Progress */}
              <div className="relative h-36 w-36">
                <svg
                  className="h-full w-full"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    strokeDasharray={`${accuracy}, 100`}
                    strokeDashoffset="-15"
                    strokeLinecap="round"
                    strokeWidth="3"
                    transform="rotate(-90 18 18)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-white text-3xl font-bold">{accuracy}%</p>
                  <p className="text-white/60 text-sm">Accuracy</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#2b2bee]" />
                  <div>
                    <p className="text-white font-medium">{score} Correct</p>
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

            {/* View Report Button */}
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2b2bee] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2b2bee]/90"
            >
              View Detailed Report <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Leaderboard */}
          <Leaderboard />
        </div>
      </main>
    </div>
  );
};

export default ScorePage;
