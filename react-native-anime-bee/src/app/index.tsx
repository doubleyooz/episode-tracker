import { Redirect, Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";

import { useAuth } from "@/src/contexts/AuthContext";
import SearchBar from "@/src/components/Searchbar";

import ListCard from "../components/cards/List";
import { IList, findLists } from "../services/list";
import CustomButtom from "../components/CustomButton";

import { IAnime } from "../services/anime";
import AnimeDropdown from "../components/AnimeDropdown";

import tw from "@/src/constants/tailwind";

export default function App() {
  const { token, user, handleSignout } = useAuth();
  console.log({ token, user });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const [search, setSearch] = useState("");
  const [lists, setLists] = useState<IList[]>([]);
  const [animes, setAnimes] = useState<IAnime[]>([
    {
      id: 2,
      title: "title",
      description: "dsadasdasd",
      studio: "studio",
    },
    {
      id: 1,
      title: "title",
      studio: "studio",
      description:
        "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?",
    },
    {
      id: 3,
      title: "title",
      studio: "studio",
      description: "dsadasdasd",
    },
  ]);

  useEffect(() => {
    const fetchLists = async () => {
      const listResults = (await findLists(user?.id as number)).data;
      console.log({ listResults });
    };

    fetchLists();
  }, []);

  return (
    <SafeAreaView style={[styles.pageContainer]}>
      <Stack.Screen options={{ title: `${user?.username}'s home` }} />
      <View
        style={[tw`flex pt-4 justify-center bg-green-200 px-6`, { rowGap: 24 }]}
      >
        <SearchBar
          search={search}
          onChange={(str: string) => setSearch(str)}
          onBlur={() => {}}
        />
        <Text style={tw`text-base tracking-wider`}>My lists</Text>
        <ListCard
          onPress={() => {}}
          title={"Title"}
          description={
            "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"
          }
          dropdown
          items={animes}
        />

        <ListCard
          onPress={() => {}}
          title={"Title"}
          description={
            "(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?(A Psalm of David.) The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?"
          }
          expanded
          items={[]}
        />

        <Text style={tw`text-base tracking-wider`}>My animes</Text>
        <AnimeDropdown
          addAction={() => router.navigate("/(home)/createAnime")}
          items={animes}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
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
