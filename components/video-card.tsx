import { View, Text, Image } from "react-native";
import React from "react";

import { Post } from "@/lib/appwrite";
import { icons } from "@/constants";
import Video from "@/components/video";

interface VideoCardProps extends Post {}

const VideoCard = ({ title, thumbnail, video, creator: { username, avatar } }: VideoCardProps) => {

  return (
    <View className="mb-14 flex-col items-center px-4">
      <View className="flex-row items-start gap-3">
        <View className="flex-1 flex-row items-center justify-center">
          <View className="size-[46px] items-center justify-center rounded-xl border border-secondary p-0.5">
            <Image
              source={{ uri: avatar }}
              className="size-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="ml-3 flex-1 justify-center gap-y-1">
            <Text
              className="font-semibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="font-regular text-xs text-gray-100"
              numberOfLines={1}
            >
              {username}
            </Text>

          </View>

          <View className="pt-2">
            <Image
              source={icons.menu}
              className="size-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <Video
        uri={video}
        thumbnail={thumbnail}
        width="100%"
        height={240}
      />
    </View>
  );
};

export default VideoCard;