import * as React from "react";
import { cn } from "../../lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "icon";
};

const variants = {
  primary:
    "bg-gradient-to-r from-fuchsia-500 via-rose-400 to-amber-300 text-zinc-950 shadow-glow hover:brightness-110",
  secondary:
    "border border-white/10 bg-white/10 text-white hover:bg-white/15 backdrop-blur-xl",
  ghost: "text-zinc-300 hover:bg-white/10 hover:text-white",
  danger: "bg-rose-500 text-white hover:bg-rose-400",
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4",
  icon: "h-11 w-11 p-0",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
