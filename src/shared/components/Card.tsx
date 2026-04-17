import type { HTMLAttributes, PropsWithChildren } from "react";

import { cn } from "@/shared/utils";

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Card({ children, className, ...props }: CardProps): JSX.Element {
  return (
    <section className={cn("card", className)} {...props}>
      {children}
    </section>
  );
}
