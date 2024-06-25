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

import { IAnime, findAnimes } from "../services/anime";
import AnimeDropdown from "../components/AnimeDropdown";

import tw from "@/src/constants/tailwind";
import RoundedButton from "../components/buttons/RoundedButton";
import { useList } from "../contexts/ListContext";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
  const { token, user, handleSignout } = useAuth();

  if (!token) return <Redirect href={"/(auth)/login"} />;

  const [search, setSearch] = useState("");
  const [lists, setLists] = useState<IList[]>([]);
  const [animes, setAnimes] = useState<IAnime[]>([]);
  const [expandedList, setExpandedList] = useState<number | null>(null);

  const { setList } = useList();

  useEffect(() => {
    const fetchLists = async () => {
      const listResults = (await findLists(user?.id as number)).data;
      // console.log({ listResults: listResults.data });
      setLists(listResults.data as IList[]);
    };

    const fetchAnimes = async () => {
      const animeResults = (await findAnimes(user?.id as number)).data;
      // console.log({ animeResults: animeResults.data });
      setAnimes(animeResults.data as IAnime[]);
    };
    fetchLists();
    fetchAnimes();
  }, []);

  return (
    <SafeAreaView style={[styles.pageContainer]}>
      <Stack.Screen options={{ title: `${user?.username}'s home` }} />
      <View style={[tw`flex pt-4 justify-center px-6`, { rowGap: 24 }]}>
        <View style={tw`flex w-full items-end`}>
          <RoundedButton
            action={() => router.navigate("/(home)/search")}
            icon={<AntDesign name="search1" size={24} color="black" />}
          />
        </View>

        <Text style={tw`text-base tracking-wider`}>My lists</Text>
        <View style={[tw`flex flex-col`, { rowGap: 24 }]}>
          {lists.length === 0 ? (
            <View>
              <Text style={tw`text-base text-center`}>No lists found</Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={[tw`flex`, { rowGap: 8 }]}
              data={lists}
              renderItem={({ item, index }) => (
                <ListCard
                  onPress={() => {
                    setList(item);
                    setExpandedList(index);
                  }}
                  title={item.title}
                  description={item.description}
                  items={[]}
                  outline
                  redirect
                  variant={index % 2 === 0 ? "primary" : "secondary"}
                  expanded={expandedList === index}
                />
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
          <RoundedButton
            action={() => router.navigate("/(home)/list/createList")}
          />
        </View>
        <Text style={tw`text-base tracking-wider`}>My animes</Text>
        <AnimeDropdown
          addAction={() => router.navigate("/(home)/anime/createAnime")}
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
