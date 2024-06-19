import { Text, ScrollView, View, TouchableOpacity, Image, Alert } from "react-native";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import { Form, FormField, FormItem } from "@/components/form";
import Input from "@/components/input";
import { icons } from "@/constants";
import CustomButton from "@/components/custom-button";
import { useGlobalContext } from "@/context/global-provider";
import { createVideo } from "@/lib/appwrite";
import AreaWrapper from "@/components/area-wrapper";

const documentPickerValidation = z.custom<ImagePicker.ImagePickerAsset>((value) => {
  if (value === null) return "필수 항목입니다.";

  return true;
});

const createFormSchema = z.object({
  title: z.string().min(3),
  video: documentPickerValidation,
  thumbnail: documentPickerValidation,
  prompt: z.string().min(1),
});

export type CreateFormSchemaType = z.infer<typeof createFormSchema>;

const Create = () => {
  const { user } = useGlobalContext();
  const form = useForm<CreateFormSchemaType>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: "",
      prompt: "",
    },
  });

  const openPicker = async(selectType: "video" | "image") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image" ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    if (selectType === "image") form.setValue("thumbnail", result.assets[0]);

    if (selectType === "video") form.setValue("video", result.assets[0]);
  };

  const onSubmit = async(data: CreateFormSchemaType) => {
    if (!user?.$id) throw new Error("User not found");

    await createVideo({
      ...data,
      userId: user?.$id,
    });
    Alert.alert("업로드가 완료되었습니다.");
    router.push("/home");
    form.reset();
  };

  return (
    <AreaWrapper>
      <ScrollView className="mb-2 mt-6 h-full px-4">
        <Text className="mb-8 font-semibold text-2xl text-white">
          동영상 업로드
        </Text>
        <Form {...form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormItem
                label="영상 제목"
                required
                className="mb-[22px]"
              >
                <Input
                  value={value}
                  placeholder="영상의 제목을 입력해주세요."
                  keyboardType="default"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="video"
            render={() => (
              <FormItem
                label="영상 업로드"
                required
                className="mb-[22px]"
              >
                <TouchableOpacity
                  onPress={() => openPicker("video")}
                >
                  {form.getValues("video")?.uri ? (
                    <View className="w-full rounded-lg bg-black-100">
                      <Video
                        source={{
                          uri: form.getValues("video")!.uri,
                        }}
                        style={{
                          width: "100%",
                          height: 256,
                          borderRadius: 16,
                        }}
                      />
                    </View>
                  ) : (
                    <View className="h-64 w-full items-center justify-center rounded-2xl bg-black-100 px-4">
                      <View className="size-14 items-center justify-center border border-dashed border-secondary-100">
                        <Image
                          source={icons.upload}
                          className="size-1/2"
                          resizeMode="contain"
                        />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={() => (
              <FormItem
                label="썸네일 이미지"
                required
                className="mb-[22px]"
              >
                <TouchableOpacity
                  onPress={() => openPicker("image")}
                >
                  {form.getValues("thumbnail")?.uri ? (
                    <Image
                      source={{ uri: form.getValues("thumbnail")!.uri }}
                      className="h-40 w-full rounded-2xl"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="h-16 w-full flex-row items-center justify-center gap-x-2 rounded-2xl border-2 border-black-200 bg-black-100 px-4">
                      <Image
                        source={icons.upload}
                        className="size-5"
                        resizeMode="contain"
                      />
                      <Text className="font-medium text-sm text-gray-100">
                        파일 선택
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prompt"
            render={({ field: { value, onChange, onBlur } }) => (
              <FormItem
                label="AI 프롬프트"
                required
                className="mb-6"
              >
                <Input
                  value={value}
                  placeholder="영상 생성에 사용할 프롬프트를 입력해주세요."
                  keyboardType="default"
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              </FormItem>
            )}
          />
          <CustomButton
            onPress={form.handleSubmit(onSubmit)}
            isLoading={form.formState.isSubmitting}
          >
            <Text className="font-semibold text-primary">
                저장
            </Text>
          </CustomButton>
        </Form>
      </ScrollView>
    </AreaWrapper>
  );
};

export default Create;