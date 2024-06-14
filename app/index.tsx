import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants";
import CustomButton from "@/components/custom-button";

export default function App() {
  return (
    <SafeAreaView className="h-full bg-primary" style={{
      backgroundColor: "#161622", // @see https://github.com/nativewind/nativewind/issues/628#issuecomment-2046987837
      height: "100%",
    }}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="min-h-[85vh] w-full items-center justify-center px-4">
          <Image
            source={images.logo}
            className="h-[84px] w-[130px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="h-[300px] w-full max-w-[380px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-center font-bold text-3xl text-white">
              AI 미디어 생성 플랫폼
            </Text>
            <Text className="text-center font-bold text-3xl text-secondary-200">Aora</Text>
            <Image
              source={images.path}
              className="absolute inset-x-16 -bottom-2 h-[15px] w-[110px]"
              resizeMode="contain"
            />
          </View>
          <Text className="mt-7 text-center font-regular text-sm text-gray-100"
          >
            창의성과 혁신이 만나는 곳
            <Text className="font-bold text-secondary-200"> Aora</Text>
            와 함께 무한한 탐험의 여정을 시작하세요.
          </Text>

          <CustomButton
            className="mt-7 w-full"
            handlePress={() => router.push("/sign-in")}
          >
            <Text className="font-semibold text-primary">이메일로 시작하기</Text>
          </CustomButton>
        </View>

        <StatusBar backgroundColor="#161622" style="light" />
      </ScrollView>
    </SafeAreaView>
  );
}