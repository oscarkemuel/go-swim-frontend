import React from "react";
import clsx from "clsx";

type Variant = "blue" | "green" | "red" | "yellow" | "gray";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  variant?: Variant;
  filled?: boolean;
  isIconButton?: boolean;
}

export const Button = ({
  children,
  onClick,
  variant = "blue",
  isIconButton = false,
  filled = true,
  ...props
}: ButtonProps) => {
  const baseClasses =
    `font-medium rounded-lg text-sm ${isIconButton ? "p-2" : "px-5 py-2.5 w-full"} focus:outline-none cursor-pointer`;

  const getBackgroundClass = (variant: Variant) => {
    if(props.disabled) {
      return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    }

    if (filled) {
      switch (variant) {  
        case 'blue':
          return 'text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700';
        case 'green':
          return 'text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700';
        case 'red':
          return 'text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700';
        case 'yellow':
          return 'text-black bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600';
        case 'gray':
          return 'text-white bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700';
        default:
          return '';
      }
    }

    return `bg-transparent focus:ring-0 border border-gray-300 blue-700 text-${variant}-700 hover:text-white hover:bg-blue-600 hover:border-1 hover:border-transparent`;
  };

  const variants: Record<Variant, string> = {
    blue: getBackgroundClass('blue'),
    green: getBackgroundClass('green'),
    red: getBackgroundClass('red'),
    yellow: getBackgroundClass('yellow'),
    gray: getBackgroundClass('gray'),
  };

  return (
    <button onClick={onClick} className={clsx(baseClasses, variants[variant])} {...props}>
      {children}
    </button>
  );
};
