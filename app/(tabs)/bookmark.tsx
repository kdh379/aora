import { View, FlatList, Text, RefreshControl } from "react-native";
import React from "react";

import EmptyState from "@/components/empty-state";
import { Post, getBookmarkPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/use-appwrite";
import VideoCard, { VideoCardSkeleton } from "@/components/video-card";
import { useGlobalContext } from "@/context/global-provider";
import AreaWrapper from "@/components/area-wrapper";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useAppwrite<Post[]>(() => getBookmarkPosts(user?.$id || ""));

  return (
    <AreaWrapper>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard {...item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 gap-y-6 px-4">
            <Text className="mb-8 font-semibold text-2xl text-white">
              북마크
            </Text>

            <View className={isLoading ? "" : "hidden"}>
              <VideoCardSkeleton />
              <VideoCardSkeleton />
              <VideoCardSkeleton />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="북마크한 동영상이 없습니다."
            subtitle="원하는 동영상을 북마크에 추가해보세요."
            className={isLoading ? "hidden" : ""}
          />
        )}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch} />}
      />
    </AreaWrapper>
  );
};

export default Bookmark;