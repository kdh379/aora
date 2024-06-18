import { Text, FlatList } from "react-native";
import React from "react";

import { Post } from "@/lib/appwrite";

interface TrendingProps {
  posts: Post[];
}

const Trending = ({ posts }: TrendingProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">
          {item.id}
        </Text>
      )}
      horizontal
    />
  );
};

export default Trending;