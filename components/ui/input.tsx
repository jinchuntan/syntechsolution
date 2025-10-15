
import * as React from "react";
import { cn } from "@/lib/utils";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn("flex h-9 w-full rounded-md border bg-white px-3 py-1 text-sm shadow-sm outline-none focus:ring-2 focus:ring-neutral-900/20", className)} {...props} />
));
Input.displayName = "Input";
