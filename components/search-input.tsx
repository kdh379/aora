import { View, Alert } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { router, usePathname } from "expo-router";

import { icons } from "@/constants";
import Input from "@/components/input";
import CustomButton from "@/components/custom-button";

interface SearchInputProps {
  initialQuery?: string;
}

const SearchInput = ({ initialQuery }: SearchInputProps) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="relative">
      <Input
        value={query}
        placeholder="비디오 주제를 검색하세요"
        onChangeText={setQuery}
      />
      <CustomButton
        variant="ghost"
        size="icon"
        className="absolute inset-y-0 right-0 justify-center pr-4"
        onPress={() => {
          if (!query) return Alert.alert("검색어를 입력해주세요.");

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          className="size-5"
          resizeMode="contain"
        />
      </CustomButton>
    </View>
  );
};

export default SearchInput;