import { Redirect, Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/src/contexts/AuthContext";
import SettingsOption from "@/src/components/SettingsOption";
import CustomButton from "@/src/components/buttons/CustomButton";
import { logout } from "@/src/services/auth";

export default function App() {
  const { token, user, setToken, setUser, handleSignout } = useAuth();
  console.log({ config: token });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const signOut = async () => {
    try {
      await handleSignout();
      router.push("/(auth)/login");
    } catch (err: any) {
      console.log(err.response);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 24,
      }}
    >
      <View style={styles.titleContainer}>
        <Text>{user ? user.username : "User"}'s settings body</Text>
        <SettingsOption
          label={"Email"}
          value={user ? user.email : "empty????"}
          disabled={user ? !user.active : true}
          onPress={() => router.push("(config)/changeEmail")}
        />
        <SettingsOption
          label={"Username"}
          value={user ? user.username : "empty????"}
          onPress={() => router.push("(config)/changeUsername")}
        />
      </View>

      <CustomButton
        text="Sign out"
        outline
        variant="error"
        onPress={async () => await signOut()}
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
