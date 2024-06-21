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
import CustomButtom from "../components/buttons/CustomButton";

import { IAnime, findAnimes } from "../services/anime";
import AnimeDropdown from "../components/AnimeDropdown";

import tw from "@/src/constants/tailwind";
import Episode from "../components/Episode";
import { Entypo } from "@expo/vector-icons";
import RoundedButton from "../components/buttons/RoundedButton";

export default function App() {
  const { token, user, handleSignout } = useAuth();
  console.log({ token, user });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const [search, setSearch] = useState("");
  const [lists, setLists] = useState<IList[]>([]);
  const [animes, setAnimes] = useState<IAnime[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      const listResults = (await findLists(user?.id as number)).data;
      console.log({ listResults: listResults.data });
      setLists(listResults.data as IList[]);
    };

    const fetchAnimes = async () => {
      const animeResults = (await findAnimes(user?.id as number)).data;
      console.log({ animeResults: animeResults.data });
      setAnimes(animeResults.data as IAnime[]);
    };
    fetchLists();
    fetchAnimes();
  }, []);

  return (
    <SafeAreaView style={[styles.pageContainer]}>
      <Stack.Screen options={{ title: `${user?.username}'s home` }} />
      <View style={[tw`flex pt-4 justify-center px-6`, { rowGap: 24 }]}>
        <SearchBar
          search={search}
          onChange={(str: string) => setSearch(str)}
          onBlur={() => {}}
        />

        <Text style={tw`text-base tracking-wider`}>My lists</Text>
        {lists.length === 0 ? (
          <View>
            <Text style={tw`text-base text-center`}>No lists found</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ rowGap: 4 }}
            data={lists}
            renderItem={({ item, index }) => (
              <ListCard
                onPress={() => {}}
                title={item.title}
                description={item.description}
                items={[]}
                dropdown
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
        <RoundedButton action={() => router.navigate("/(home)/createList")} />
        <Text style={tw`text-base tracking-wider`}>My animes</Text>
        <AnimeDropdown
          addAction={() => router.navigate("/(home)/createAnime")}
          items={animes}
          addAnime
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: "column",

    flex: 1,
    margin: 0,
    padding: 0,
    display: "flex",
  },
});
