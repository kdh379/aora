import { View, Text } from "react-native";
import React from "react";

import { cn } from "@/lib/cn";

interface InfoBoxProps {
  title: string | number;
  subtitle?: string;
  containerStyles?: string;
  titleStyles?: string;
}

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: InfoBoxProps) => {
  return (
    <View className={containerStyles}>
      <Text className={cn("text-center font-semibold text-white", titleStyles)}>{title}</Text>
      <Text className={cn("text-center font-regular text-sm text-gray-100")}>{subtitle}</Text>
    </View>
  );
};

export default InfoBox;