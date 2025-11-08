import React from "react";

const PerformanceChart: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 rounded-xl p-6 border border-white/10 bg-white/5">
      <h2 className="text-white text-[22px] font-bold">Performance Trend</h2>
      <div className="w-full h-72 flex items-center justify-center">
        <img
          className="w-full h-full object-contain"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcNSyYFuh0ywLe4VhV6xfPDdvN5C83eoWV_LR8coEdobOqUVQgCgJuajygICqqsJkHLP5MgOq2cVL7iVYd-jEcbS6JBMcyhKxhw2UawHSS6GlyaSJwaYXuJ_79PJJWUQD-LI3NH6NK41fDBUCHy6bTBEximuByIhL9j-YLLtSpNDkL652WbBVHkMAKZhVU94yTWWdrxMJuZyWIoAVu0ocTk3DiQsMago_Uc3ZnwXTmFrB-h4s3mCemhRo5-7or1O7rBtrG3hdWhes"
          alt="Performance Chart"
        />
      </div>
    </div>
  );
};

export default PerformanceChart;