import { View, Text, FlatList, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";

import { useGlobalContext } from "@/context/global-provider";
import { icons, images } from "@/constants";
import Input from "@/components/input";
import CustomButton from "@/components/custom-button";
import Trending from "@/components/trending";
import EmptyState from "@/components/empty-state";
import { Post, getAllPosts, getLatestPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/use-appwrite";
import VideoCard from "@/components/video-card";

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

            <View className="relative">
              <Input placeholder="비디오 주제를 검색하세요" />
              <CustomButton
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 justify-center pr-4"
              >
                <Image
                  source={icons.search}
                  className="size-5"
                  resizeMode="contain"
                />
              </CustomButton>

            </View>
            <View className="mb-8 mt-5 w-full flex-1">
              <Text className="font-regular text-lg text-gray-100">
                최근 비디오
              </Text>

              <Trending
                posts={latestPosts || []}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="동영상을 찾을 수 없습니다."
            subtitle="먼저 비디오를 만들어보세요!"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;