import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import EmptyState from "@/components/empty-state";
import { Post, searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/use-appwrite";
import VideoCard from "@/components/video-card";
import SearchInput from "@/components/search-input";

const Search = () => {
  const { query } = useLocalSearchParams();
  const searchInput = Array.isArray(query) ? query.join(" ") : query || "";
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite<Post[]>(() => searchPosts(searchInput));

  useEffect(() => {
    refetch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <SafeAreaView className="bg-primary" style={{
      backgroundColor: "#161622",
      height: "100%",
    }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard {...item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-medium text-sm text-gray-100">
                  검색 결과
            </Text>
            <Text className="font-semibold text-2xl text-white">
              {query}
            </Text>
            <View className="mb-8 mt-6">
              <SearchInput initialQuery={searchInput} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="동영상을 찾을 수 없습니다."
            subtitle="다른 검색어를 입력해보세요."
            className={isLoading ? "hidden" : ""}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;