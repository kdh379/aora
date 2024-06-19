import { View, FlatList, Image, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

import EmptyState from "@/components/empty-state";
import { Post, getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/use-appwrite";
import VideoCard, { VideoCardSkeleton } from "@/components/video-card";
import { useGlobalContext } from "@/context/global-provider";
import CustomButton from "@/components/custom-button";
import { icons } from "@/constants";
import InfoBox from "@/components/info-box";
import AreaWrapper from "@/components/area-wrapper";
import { cn } from "@/lib/cn";

const Profile = () => {
  const { user, setUser } = useGlobalContext();
  const {
    data: posts,
    isLoading,
  } = useAppwrite<Post[]>(() => getUserPosts(user?.$id || ""));

  const handleSignOut = async() => {
    await signOut();
    setUser(null);

    router.replace("/sign-in");
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
          <View className="mb-12 mt-6 w-full items-center justify-center px-4">
            <CustomButton
              variant="ghost"
              size="icon"
              className="mb-10 ml-auto"
              onPress={handleSignOut}
            >
              <Image
                source={icons.logout}
                className="size-6"
                resizeMode="contain"
              />
            </CustomButton>

            <View className="size-16 items-center justify-center rounded-lg border border-secondary">
              <Image
                source={{ uri: user?.avatar }}
                className="size-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username || ""}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={posts?.length || 0}
                subtitle="게시물"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2K"
                subtitle="팔로워"
                titleStyles="text-lg"
              />
            </View>

            <View className={cn("mt-12 w-full", isLoading ? "" : "hidden")}>
              <VideoCardSkeleton />
              <VideoCardSkeleton />
              <VideoCardSkeleton />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="업로드한 영상이 없습니다."
            subtitle="첫번째 영상을 업로드해보세요!"
            className={isLoading ? "hidden" : ""}
          >
            <CustomButton
              className="my-5 w-full"
              onPress={() => router.push("/create")}
            >
              <Text className="font-semibold text-lg text-primary">비디오 만들기</Text>
            </CustomButton>
          </EmptyState>
        )}
      />
    </AreaWrapper>
  );
};

export default Profile;