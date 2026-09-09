import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "secondaryLight" | "quiet";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-button " +
  "font-medium tracking-[0.08em] uppercase whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-300 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] " +
  "hover:-translate-y-px active:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-55";

const variants: Record<Variant, string> = {
  /* Gold field, navy label — 5.4:1, rising to 7.5:1 on hover. The shine-sweep
     is reserved for this one variant: a single considered highlight on the
     site's primary action, not a mannerism repeated on every control. */
  primary:
    "shine-sweep bg-gold text-navy hover:bg-gold-light hover:shadow-[0_10px_28px_-14px_rgba(1,30,62,0.55)]",
  /* For light backgrounds. */
  secondary:
    "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-white",
  /* For navy or photographic backgrounds. */
  secondaryLight:
    "border border-white/35 text-white hover:border-white hover:bg-white hover:text-navy",
  /* Text-only action that still reads as a control. */
  quiet:
    "text-navy underline-offset-[6px] hover:text-gold-deep hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-[0.6875rem]",
  md: "px-6 py-3 text-xs sm:px-7 sm:py-3.5",
  lg: "px-7 py-3.5 text-xs sm:px-9 sm:py-4 sm:text-[0.8125rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Renders the button at full width — used inside the mobile menu. */
  block?: boolean;
}

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

type ButtonAsButton = CommonProps & {
  href?: undefined;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    block,
    ...rest
  } = props;

  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    block && "w-full",
    className,
  );

  if (rest && "href" in rest && typeof rest.href === "string") {
    const { href, ...linkProps } = rest as ButtonAsLink;
    const external = /^(https?:|mailto:|tel:)/.test(href);

    if (external) {
      return (
        <a href={href} className={classes} {...(linkProps as object)}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
