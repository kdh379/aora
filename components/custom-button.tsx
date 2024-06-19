import { Image, TouchableOpacity } from "react-native";
import React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { icons } from "@/constants";

const buttonVariants = cva(
  "items-center justify-center rounded-xl flex-row",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        ghost: "bg-transparent",
      },
      size: {
        default: "min-h-[62px]",
        icon: "min-h-5 min-w-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface CustomButtonProps extends
  React.ComponentProps<typeof TouchableOpacity>,
  VariantProps<typeof buttonVariants>
{
  isLoading?: boolean;
}

const CustomButton = ({ className, isLoading, variant, size, children, ...props }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        buttonVariants({ variant, size, className }),
        isLoading ? "opacity-50" : "",
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      {...props}
    >
      {children}

      {isLoading && (
        <Image
          source={icons.loading}
          className="size-6 animate-spin"
          resizeMode="contain"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;