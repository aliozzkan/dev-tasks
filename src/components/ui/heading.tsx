import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva(
  "text-foreground font-medium leading-tight tracking-tight",
  {
    variants: {
      size: {
        default: "text-2xl",
        sm: "text-xl",
        lg: "text-3xl",
        xl: "text-4xl",
      },
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

function Heading({
  className,
  size,
  variant,
  as,
  ...props
}: React.ComponentProps<"h1" | "h2" | "h3" | "h4" | "h5" | "h6"> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & VariantProps<typeof headingVariants>) {
  const Comp = as || "h1";
  
  return (
    <Comp className={headingVariants({ size, variant, className })} {...props} />
  );
}

export { Heading, headingVariants };
