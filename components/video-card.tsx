import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { Post } from "@/lib/appwrite";
import { icons } from "@/constants";

interface VideoCardProps extends Post {}

const VideoCard = ({ title, thumbnail, video, creator: { username, avatar } }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

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

      {isPlaying
        ? (
          <Text className="text-white">Playing</Text>
        )
        : (
          <TouchableOpacity
            className="relative h-60 w-full items-center justify-center rounded-xl"
            activeOpacity={0.7}
            onPress={() => setIsPlaying(true)}
          >
            <Image
              source={{ uri: thumbnail }}
              className="mt-3 size-full rounded-xl"
              resizeMode="cover"
            />
            <Image
              source={icons.play}
              className="absolute size-12"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
    </View>
  );
};

export default VideoCard;