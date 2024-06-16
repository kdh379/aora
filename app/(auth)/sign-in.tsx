import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormField, FormItem } from "@/components/form";
import CustomButton from "@/components/custom-button";
import { images } from "@/constants";
import Input from "@/components/input";
import { getCurrentUser, signIn } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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
      console.error(error);
      Alert.alert("요청을 처리하는 중에 문제가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary" style={{
      backgroundColor: "#161622",
      height: "100%",
    }}>
      <ScrollView>
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
                    <Input
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
            handlePress={form.handleSubmit(onSubmit)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;