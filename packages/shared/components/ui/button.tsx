import * as React from "react"
import { cn } from "../../utils/cn"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "px-4 py-2 rounded font-semibold transition-colors",
          variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "secondary" && "bg-gray-200 text-gray-900 hover:bg-gray-300",
          variant === "outline" && "border border-gray-400 text-gray-900 hover:bg-gray-100",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
