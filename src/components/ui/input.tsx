import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelStyle?: string;
  supportingText?: string;
  supportingTextStyle?: string;
  touched?: boolean;
  error?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, labelStyle = "", type, error, touched, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className={cn("text-sm font-medium", labelStyle)} htmlFor={props.id}>
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {touched && error && (
          <label className={"text-sm text-red-500 absolute"}>
            {error?.message || typeof error === "string" ? error : null}
          </label>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
