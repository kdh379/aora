import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="font-pblack text-3xl">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/profile">
        Go to Profile
      </Link>
    </View>
  );
}