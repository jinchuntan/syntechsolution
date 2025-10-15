
import * as React from "react";
import { cn } from "@/lib/utils";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => (
  <button ref={ref} className={cn("inline-flex items-center justify-center gap-1.5 rounded-md text-sm font-medium px-4 py-2 bg-black text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed border border-transparent", className)} {...props} />
));
Button.displayName = "Button";
