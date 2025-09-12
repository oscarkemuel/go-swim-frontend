import React from "react";
import clsx from "clsx";

type Color = "blue" | "green" | "red" | "yellow" | "gray";
type Variant = "normal" | "filled" | "outlined" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  color?: Color;
  variant?: Variant;
  isLoading?: boolean;
}

export const Button = ({
  children,
  onClick,
  color = "blue",
  variant = "filled",
  isLoading = false,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "font-medium rounded-lg text-sm focus:outline-none flex items-center justify-center transition-colors cursor-pointer";

  const sizeClasses = variant === "icon" ? "p-2" : "px-5 py-2.5 w-full";

  const getColorClasses = (color: Color, variant: Variant) => {
    if (disabled || isLoading) {
      return "bg-gray-300 text-gray-500 cursor-not-allowed";
    }

    if (variant === "filled") {
      switch (color) {
        case "blue":
          return "bg-blue-600 hover:bg-blue-700 text-white";
        case "green":
          return "bg-green-600 hover:bg-green-700 text-white";
        case "red":
          return "bg-red-600 hover:bg-red-700 text-white";
        case "yellow":
          return "bg-yellow-400 hover:bg-yellow-500 text-black";
        case "gray":
          return "bg-gray-600 hover:bg-gray-700 text-white";
      }
    }

    if (variant === "outlined") {
      switch (color) {
        case "blue":
          return "border border-blue-600 text-blue-600 hover:bg-blue-50";
        case "green":
          return "border border-green-600 text-green-600 hover:bg-green-50";
        case "red":
          return "border border-red-600 text-red-600 hover:bg-red-50";
        case "yellow":
          return "border border-yellow-400 text-yellow-500 hover:bg-yellow-50";
        case "gray":
          return "border border-gray-600 text-gray-600 hover:bg-gray-50";
      }
    }

    if (variant === "normal") {
      switch (color) {
        case "blue":
          return "text-blue-600 hover:underline";
        case "green":
          return "text-green-600 hover:underline";
        case "red":
          return "text-red-600 hover:underline";
        case "yellow":
          return "text-yellow-500 hover:underline";
        case "gray":
          return "text-gray-600 hover:underline";
      }
    }

    if (variant === "icon") {
      switch (color) {
        case "blue":
          return "text-blue-600 hover:bg-blue-100";
        case "green":
          return "text-green-600 hover:bg-green-100";
        case "red":
          return "text-red-600 hover:bg-red-100";
        case "yellow":
          return "text-yellow-500 hover:bg-yellow-100";
        case "gray":
          return "text-gray-600 hover:bg-gray-100";
      }
    }

    return "";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={clsx(
        baseClasses,
        sizeClasses,
        getColorClasses(color, variant),
        className
      )}
      {...props}
    >
      {isLoading ? (
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
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
};
