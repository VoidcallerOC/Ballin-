import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-display text-base font-bold uppercase tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
  {
    variants: {
      variant: {
        primary: "bg-pink text-pink-ink hover:bg-fg",
        line: "border border-line bg-transparent text-fg hover:border-pink hover:text-pink",
        quiet: "bg-transparent text-fg hover:text-pink",
      },
      size: {
        default: "min-h-11 px-5 py-2",
        small: "min-h-11 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
