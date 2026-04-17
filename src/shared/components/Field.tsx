import {
  Children,
  cloneElement,
  isValidElement,
  type PropsWithChildren,
  type ReactElement
} from "react";

import { cn } from "@/shared/utils";

type HelperTone = "error" | "info";

interface FieldProps extends PropsWithChildren {
  label: string;
  htmlFor: string;
  helperText?: string;
  helperTone?: HelperTone;
  className?: string;
}

interface DescribedElementProps {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
}

export function Field({
  children,
  className,
  helperText,
  helperTone = "info",
  htmlFor,
  label
}: FieldProps): JSX.Element {
  const helperId = helperText ? `${htmlFor}-helper` : undefined;
  const onlyChild = Children.only(children);
  const childElement = isValidElement<DescribedElementProps>(onlyChild) ? onlyChild : null;
  const describedChild =
    helperId &&
    childElement
      ? cloneElement(childElement as ReactElement<DescribedElementProps>, {
          "aria-describedby": [
            childElement.props["aria-describedby"],
            helperId
          ]
            .filter(Boolean)
            .join(" "),
          "aria-invalid": helperTone === "error" ? true : undefined
        })
      : children;

  return (
    <label className={cn("field", className)} htmlFor={htmlFor}>
      <span className="field__label">{label}</span>
      {describedChild}
      {helperText ? (
        <span
          id={helperId}
          aria-live={helperTone === "error" ? "polite" : undefined}
          className={cn("field__helper", `field__helper--${helperTone}`)}
          role={helperTone === "error" ? "alert" : undefined}
        >
          <span aria-hidden="true" className="field__helper-icon">
            {helperTone === "error" ? "!" : "i"}
          </span>
          <span>{helperText}</span>
        </span>
      ) : null}
    </label>
  );
}
