import * as React from "react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  errors?: string[];
  className?: string;
  children: React.ReactNode;
};

export function FormField({
  label,
  name,
  hint,
  required,
  errors,
  className,
  children,
}: Props) {
  const errorList = errors && errors.length > 0 ? errors : null;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
      {hint && !errorList && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {errorList && (
        <ul className="space-y-0.5 text-xs text-destructive">
          {errorList.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
