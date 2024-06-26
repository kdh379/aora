import { View, Text, Image } from "react-native";
import React from "react";

import { images } from "@/constants";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  subtitle: string;
  className?: string;
  children?: React.ReactNode;
}

const EmptyState = ({ title, subtitle, children, className }: EmptyStateProps) => {
  return (
    <View className={cn("items-center justify-center px-4", className)}>
      <Image
        source={images.empty}
        className="h-[215px] w-[270px]"
        resizeMode="contain"
      />
      <Text className="mt-2 text-center font-semibold text-xl text-white">{title}</Text>
      <Text className="text-center font-medium text-sm text-gray-100">{subtitle}</Text>

      {children}
    </View>
  );
};

export default EmptyState;