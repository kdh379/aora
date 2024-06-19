import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { customErrorMap } from "@/lib/zod";
import { images } from "@/constants";
import CustomButton from "@/components/custom-button";
import { createUser, getCurrentUser } from "@/lib/appwrite";
import { Form, FormField, FormItem } from "@/components/form";
import Input from "@/components/input";
import { useGlobalContext } from "@/context/global-provider";
import SecureInput from "@/components/secure-input";
import AreaWrapper from "@/components/area-wrapper";

const signUpSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});
z.setErrorMap(customErrorMap);

type SignUpSchemaType = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const { setUser } = useGlobalContext();
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async() => {
    setIsSubmitting(true);
    try {
      await createUser(form.getValues());

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
    <AreaWrapper>
      <ScrollView>
        <View className="my-6 size-full min-h-[83vh] justify-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="h-[35px] w-[115px]"
          />
          <Text className="mt-10 font-semibold text-2xl text-white">회원가입</Text>

          <Form {...form}>
            <View className="mt-7 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field: { value, onChange, onBlur } }) => (
                  <FormItem
                    label="사용자"
                    required
                  >
                    <Input
                      value={value}
                      placeholder="aora"
                      keyboardType="default"
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </FormItem>
                )}
              />
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
            <Text className="font-semibold text-primary">회원가입</Text>
          </CustomButton>

          <View className="mt-5 flex-row justify-center gap-2">
            <Text className="font-regular text-lg text-gray-100">계정이 이미 있으신가요?</Text>
            <Link href="/sign-in">
              <Text className="font-semibold text-lg text-secondary-200">로그인</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </AreaWrapper>
  );
};

export default SignUp;