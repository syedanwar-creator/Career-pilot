import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, type = "button", variant = "primary", ...props },
  ref
): JSX.Element {
  return <button ref={ref} type={type} className={cn("button", `button--${variant}`, className)} {...props} />;
});
