import React, { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          "w-full bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-gray-400 text-sm",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export { Input };
