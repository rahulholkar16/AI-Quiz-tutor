import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-6 px-5 py-10 text-center border-t border-t-[#232348] mt-10">
      <div className="flex flex-wrap items-center justify-center gap-6">
        <a className="text-[#9292c9] text-sm hover:text-[#2b2bee] transition-colors" href="#">
          Terms of Service
        </a>
        <a className="text-[#9292c9] text-sm hover:text-[#2b2bee] transition-colors" href="#">
          Privacy Policy
        </a>
      </div>
      <p className="text-[#9292c9] text-sm">© 2024 QuizAI. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
