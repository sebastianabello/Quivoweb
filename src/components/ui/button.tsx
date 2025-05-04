import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "base" | "icon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, size = "base", ...props }, ref) => {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500";
  const sizeStyles = {
    base: "px-4 py-2 text-sm",
    icon: "p-2 text-sm"
  };

  return (
    <button
      ref={ref}
      className={twMerge(baseStyle, sizeStyles[size], className)}
      {...props}
    />
  );
});

Button.displayName = "Button";
export { Button };
