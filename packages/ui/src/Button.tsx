import { cva, VariantProps } from "class-variance-authority";
import { cn } from "./lib/utils";

const buttonVariants = cva(
  "rounded-[8px] px-4 py-3 cursor-pointer duration-300",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary/90 text-[16px]",
        secondary:
          "border-2 border-pink-200 text-pink-300 hover:bg-pink-200/90 text-[16px]",
        link: "text-primary hover:text-primary/90 p-0 text-[14px] font-semibold",
        linkGray: "text-[#757575] p-0 text-[14px] font-semibold",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "link" | "linkGray";
  className?: string;
}

export function Button({
  children,
  variant,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, className }))} {...props}>
      {children}
    </button>
  );
}
