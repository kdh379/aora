import { TouchableOpacity } from "react-native";
import React from "react";

import { cn } from "@/lib/cn";

interface CustomButtonProps {
  className?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  handlePress?: () => void;
}

const CustomButton = ({ className, isLoading, children, handlePress }: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        "min-h-[62px] items-center justify-center rounded-xl bg-secondary",
        isLoading ? "opacity-50" : "",
        className,
      )}
      activeOpacity={0.7}
      disabled={isLoading}
      onPress={handlePress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;