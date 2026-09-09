import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const controlClasses =
  "w-full rounded-button border border-ink/20 bg-white px-4 py-3 text-base text-ink " +
  "transition-colors duration-200 placeholder:text-muted " +
  "hover:border-ink/35 focus:border-navy focus:outline-none " +
  "aria-[invalid=true]:border-red-700";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  /** Validation message. Rendering it also sets aria-invalid on the control. */
  error?: string;
  hint?: string;
  children: (props: {
    id: string;
    className: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    required?: boolean;
  }) => ReactNode;
  className?: string;
}

/**
 * Wraps a form control with its label, hint and error message, and wires the
 * aria-describedby / aria-invalid relationships between them.
 */
export function FormField({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-[0.12em] text-navy"
      >
        {label}
        {required ? (
          <>
            {" "}
            <span aria-hidden="true" className="text-gold-deep">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        ) : (
          <span className="ml-1.5 font-normal normal-case tracking-normal text-muted">
            (optional)
          </span>
        )}
      </label>

      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      ) : null}

      <div className="mt-2.5">
        {children({
          id,
          className: controlClasses,
          "aria-describedby": describedBy,
          "aria-invalid": error ? true : undefined,
          required,
        })}
      </div>

      {error ? (
        <p id={errorId} className="mt-2 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
