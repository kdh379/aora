import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppwriteException } from "react-native-appwrite";

import { Form, FormField, FormItem } from "@/components/form";
import CustomButton from "@/components/custom-button";
import { images } from "@/constants";
import Input from "@/components/input";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";
import SecureInput from "@/components/secure-input";
import AreaWrapper from "@/components/area-wrapper";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

const SignIn = () => {
  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setUser } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async() => {
    setIsSubmitting(true);
    try {
      await signIn(form.getValues());

      const result = await getCurrentUser();

      if (!result) throw Error;

      setUser(result);

      router.replace("/home");
    } catch (error) {
      if (!(error instanceof AppwriteException)) throw error;

      if (error.code === 401) {
        form.setError("email", { message: "이메일 혹은 비밀번호가 올바르지 않습니다." });
        form.setValue("password", "");
        return;
      }

      if (error.code === 429) {
        Alert.alert("로그인 시도 횟수를 초과했습니다.", "잠시 후 다시 시도해주세요.");
        form.setValue("password", "");
        return;
      }

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AreaWrapper>
      <KeyboardAwareScrollView>
        <View className="my-6 size-full min-h-[83vh] justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="mt-10 font-semibold text-2xl text-white">로그인</Text>

          <Form {...form}>
            <View className="mt-7 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormItem
                    label="이메일"
                    required
                  >
                    <Input
                      value={value}
                      placeholder="aora@aora.com"
                      keyboardType="email-address"
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormItem
                    label="비밀번호"
                    required
                  >
                    <SecureInput
                      value={value}
                      placeholder="********"
                      keyboardType="default"
                      secureTextEntry
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </FormItem>
                )}
              />
            </View>
          </Form>
          <CustomButton
            onPress={form.handleSubmit(onSubmit)}
            className="mt-7"
            isLoading={isSubmitting}
          >
            <Text className="font-semibold text-primary">로그인</Text>
          </CustomButton>
          <View className="mt-5 flex-row justify-center gap-2">
            <Text className="font-regular text-lg text-gray-100">계정이 없으신가요?</Text>
            <Link href="/sign-up">
              <Text className="font-semibold text-lg text-secondary-200">회원가입</Text>
            </Link>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </AreaWrapper>
  );
};

export default SignIn;