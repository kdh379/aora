import { TouchableOpacity, ImageBackground, Image } from "react-native";
import React, { useState } from "react";
import { Video as ExpoVideo, ResizeMode } from "expo-av";

import { icons } from "@/constants";

interface VideoProps {
  uri: string;
  thumbnail: string;
  width: number | "auto" | "100%";
  height: number | "auto" | "100%";
}

const Video = ({ uri, thumbnail, width, height }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return isPlaying ? (
    <ExpoVideo
      source={{
        uri,
      }}
      style={{
        width,
        height,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        marginTop: 12,
        borderRadius: 12,
      }}
      resizeMode={ResizeMode.CONTAIN}
      useNativeControls
      shouldPlay
      onPlaybackStatusUpdate={(status) => {
        // 공식 문서에는 status.didJustFinish를 사용하라고 나와있고 정상 동작하지만, 타입이 정의되어 있지 않음.
        // @ts-ignore
        if (status.didJustFinish) setIsPlaying(false);
      }}
    />
  ) : (
    <TouchableOpacity
      className="relative w-full items-center justify-center"
      activeOpacity={0.7}
      onPress={() => setIsPlaying(true)}
    >
      <ImageBackground
        source={{ uri: thumbnail }}
        className="my-5 overflow-hidden rounded-xl shadow-lg shadow-black/40"
        style={{
          width,
          height,
        }}
      />

      <Image
        source={icons.play}
        className="absolute size-12"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Video;