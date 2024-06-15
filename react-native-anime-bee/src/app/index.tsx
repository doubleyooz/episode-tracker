import { Redirect, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { useAuth } from "@/src/contexts/AuthContext";
import SearchBar from "@/src/components/Searchbar";
import AnimeCard from "@/src/components/cards/Anime";

export default function App() {
  const { token } = useAuth();
  console.log({ token });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const [search, setSearch] = useState("");

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <Stack.Screen options={{ title: "Username's home" }} />
      <View className="flex w-3/5 gap-12 mt-8 px-24">
        <SearchBar
          search={search}
          onChange={(str: string) => setSearch(str)}
          onBlur={() => {}}
        />
        <AnimeCard
          onPress={() => {}}
          title={"Title"}
          description={
            "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"
          }
        />
        <Text>Hello World</Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "column",
    alignItems: "center",

    flex: 1,
    margin: 0,
    padding: 0,
    display: "flex",
    width: "100%",
  },
});
