import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string
}

const Wrapper = ({ children, className = "" }: Props) => {
    const baseClasses =
        "w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 my-1 sm:my-1.5 md:my-2 lg:my-3 xl:my-4";

    return <div className={`${baseClasses} ${className}`}>{children}</div>;
};

export default Wrapper;
