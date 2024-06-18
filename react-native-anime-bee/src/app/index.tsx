import { Redirect, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { useAuth } from "@/src/contexts/AuthContext";
import SearchBar from "@/src/components/Searchbar";
import AnimeCard from "@/src/components/cards/Anime";
import { Dimensions } from "react-native";
import ListCard from "../components/cards/List";

const width = Dimensions.get("window").width; //full width
const height = Dimensions.get("window").height; //full height

export default function App() {
  const { token } = useAuth();
  console.log({ token });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const [search, setSearch] = useState("");

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <Stack.Screen options={{ title: "Username's home" }} />
      <View className="flex mt-8 bg-green-200 px-6" style={{ rowGap: 24 }}>
        <SearchBar
          search={search}
          onChange={(str: string) => setSearch(str)}
          onBlur={() => {}}
        />
        <ListCard
          onPress={() => {}}
          title={"Title"}
          description={
            "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"
          }
          itemsLength={0}
        />
        <ListCard
          onPress={() => {}}
          title={"Title"}
          description={
            "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"
          }
          expanded
          itemsLength={0}
        />
        <ListCard
          onPress={() => {}}
          title={"Title"}
          description={
            "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"
          }
          expanded
          itemsLength={0}
          username="username"
        />
        <AnimeCard
          onPress={() => {}}
          title={"Title"}
          variant="secondary"
          description={
            "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"
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

    backgroundColor: "red",
    flex: 1,
    margin: 0,
    padding: 0,
    display: "flex",
  },
});
