import { Text, View } from "react-native";
import { router } from "expo-router";

import CustomButton from "@/components/custom-button";
import { signOut } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/global-provider";

export default function Profile() {

  const { setUser } = useGlobalContext();

  const handleSignOut = async() => {
    await signOut();
    setUser(null);

    router.replace("/sign-in");
  };

  return (
    <View>
      <Text>Profile</Text>
      <CustomButton handlePress={handleSignOut}>
        <Text>로그아웃</Text>
      </CustomButton>
    </View>
  );
}