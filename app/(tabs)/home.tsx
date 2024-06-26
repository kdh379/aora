import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { router } from "expo-router";

import { useGlobalContext } from "@/context/global-provider";
import { images } from "@/constants";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import { Post, getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/use-appwrite";
import VideoCard, { VideoCardSkeleton } from "@/components/video-card";
import SearchInput from "@/components/search-input";
import AreaWrapper from "@/components/area-wrapper";
import CustomButton from "@/components/custom-button";
import { cn } from "@/lib/cn";

const Home = () => {
  const {
    data: posts,
    isLoading: isPostsLoading,
    refetch: refetchPosts,
  } = useAppwrite<Post[]>(getAllPosts);
  const {
    data: latestPosts,
    isLoading: isLatestPostsLoading,
    refetch: refetchLatestPosts,
  } = useAppwrite<Post[]>(getLatestPosts);
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async() => {
    setRefreshing(true);
    await refetchPosts();
    await refetchLatestPosts();
    setRefreshing(false);
  };

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
            <View className="mb-6 flex-row items-center justify-between">
              <View>
                <Text className="font-medium text-sm text-gray-100">
                  안녕하세요
                </Text>
                <Text className="font-semibold text-2xl text-white">
                  {user?.username}님
                </Text>
              </View>

              <View>
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="mb-8 mt-5 w-full flex-1">
              <Text className="font-regular text-lg text-gray-100">
                최근 비디오
              </Text>

              <Trending
                posts={latestPosts || []}
              />
            </View>

            <View className={cn("mt-12 w-full", isPostsLoading ? "" : "hidden")}>
              <VideoCardSkeleton />
              <VideoCardSkeleton />
              <VideoCardSkeleton />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="동영상을 찾을 수 없습니다."
            subtitle="먼저 비디오를 만들어보세요!"
            className={isPostsLoading || isLatestPostsLoading ? "hidden" : ""}
          >
            <CustomButton
              className="my-5 w-full"
              onPress={() => router.push("/create")}
            >
              <Text className="font-semibold text-lg text-primary">비디오 만들기</Text>
            </CustomButton>
          </EmptyState>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </AreaWrapper>
  );
};

export default Home;