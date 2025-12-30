import { Variable } from "lucide-react";
import { cn } from "./lib/utils";
import { cva, VariantProps } from "class-variance-authority";

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "success";
}

const badgeVariants = cva(
  "flex items-center gap-1 px-2 py-1 rounded-[8px] text-[14px] font-medium",
  {
    variants: {
      variant: {
        primary: "bg-[#EAF0FF] text-[#006FFF]",
        secondary: "bg-[#F9F5FF] text-[#8E19F5]",
        success: "bg-[#EAFFF4] text-[#00B884]",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export function Badge({ children, className, variant }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, className }))}>{children}</div>
  );
}
