import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/src/contexts/AuthContext";
import SettingsOption from "@/src/components/SettingsOption";

export default function App() {
  const { token, user } = useAuth();
  console.log({ config: token });
  if (!token) return <Redirect href={"/(auth)/login"} />;
  return (
    <View style={styles.titleContainer}>
      <Text>User's settings body</Text>
      <SettingsOption
        label={"Email"}
        value={user ? user.email : "empty????"}
        onPress={() => router.push("(home)/changeEmail")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
