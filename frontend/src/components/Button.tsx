import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    className,
    disabled,
    ...props
}) => {
    const baseStyles =
        "flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-60 disabled:cursor-not-allowed";

    const variantStyles = {
        primary:
            "bg-[#4f46e5] text-white hover:bg-[#4f46e5]/90 focus:ring-[#4f46e5]/50 border border-transparent",
        outline:
            "border border-[#323267] bg-[#191933] text-white hover:bg-[#323267]/50 focus:ring-[#323267]/50",
        ghost: "text-[#9292c9] hover:text-white bg-transparent focus:ring-[#323267]/50",
    };

    const sizeStyles = {
        sm: "h-9 px-3 text-sm",
        md: "h-12 px-5 text-base",
        lg: "h-14 px-6 text-lg",
    };

    return (
        <button
            className={clsx(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <svg
                    className="animate-spin h-5 w-5 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
