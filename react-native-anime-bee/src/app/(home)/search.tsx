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
import { useEffect, useRef, useState } from "react";

import { useAuth } from "@/src/contexts/AuthContext";
import SearchBar from "@/src/components/Searchbar";

import ListCard from "@/src/components/cards/List";
import { IList, findLists } from "@/src/services/list";

import { IAnime, findAnimes } from "@/src/services/anime";
import AnimeDropdown from "@/src/components/AnimeDropdown";

import tw from "@/src/constants/tailwind";
import RoundedButton from "@/src/components/buttons/RoundedButton";
import { useList } from "@/src/contexts/ListContext";
import { AntDesign } from "@expo/vector-icons";
import Marker from "@/src/components/Marker";
import { ColorsType } from "@/src/constants/Colors";

const colors: ColorsType[] = [
  "primary",
  "secondary",
  "error",
  "success",
  "purple",
];
type FilterType = {
  color: ColorsType;
  text: string;
  state: boolean;
  setState: (state: boolean) => void;
};

function getRandomVariant(): ColorsType {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
export default function SearchScreen() {
  const { token, user, handleSignout } = useAuth();

  if (!token) return <Redirect href={"/(auth)/login"} />;

  const [search, setSearch] = useState("");
  const [lists, setLists] = useState<IList[]>([]);
  const [animes, setAnimes] = useState<IAnime[]>([]);
  const [expandedList, setExpandedList] = useState<number | null>(null);
  const [isGlobal, setIsGlobal] = useState(false);
  const [searchUsers, setSearchUsers] = useState(false);
  const [searchAnimes, setSearchAnimes] = useState(false);
  const [searchLists, setSearchLists] = useState(false);
  const [searchReviews, setSearchReviews] = useState(false);
  const [onlyOnce, setOnlyOnce] = useState(false);
  const { setList } = useList();

  useEffect(() => {
    const fetchLists = async () => {
      const listResults = (await findLists(user?.id as number)).data;
      //console.log({ listResults: listResults.data });
      setLists(listResults.data as IList[]);
    };

    const fetchAnimes = async () => {
      const animeResults = (await findAnimes(user?.id as number)).data;
      //console.log({ animeResults: animeResults.data });
      setAnimes(animeResults.data as IAnime[]);
    };
    fetchLists();
    fetchAnimes();
  }, []);

  const [filters, setFilters] = useState<FilterType[]>([
    {
      color: "purple",
      text: "Global",
      state: isGlobal,
      setState: setIsGlobal,
    },
  ]);
  /*
  useEffect(() => {
    let hasPurple = false;
    console.log({ SEARCH: onlyOnce });
    if (onlyOnce) return;

    const stateList = [
      isGlobal,
      searchAnimes,
      searchLists,
      searchReviews,
      searchUsers,
    ];
    const setStateList = [
      setIsGlobal,
      setSearchAnimes,
      setSearchLists,
      setSearchReviews,
      setSearchUsers,
    ];
    const variantArray: FilterType[] = Array.from(
      { length: 5 },
      (index: number) => {
        const color = getRandomVariant();
        const availableFilters = [
          "global",
          "animes",
          "lists",
          "users",
          "reviews",
        ];

        console.log({
          availableFilters: availableFilters[index],
          state: stateList[index],
        });
        if (color === "purple" && !hasPurple) {
          hasPurple = true;
          return {
            setState: setStateList[index],
            state: stateList[index],
            color: colors[0], // Replace color with the first color
            text: availableFilters[index],
          };
        }

        return {
          setState: setStateList[index],
          state: stateList[index],
          color, // Use the random color
          text: availableFilters[index],
        };
      }
    );

    console.log({ filters: filters });
    console.log({ variantArray: variantArray });

    setOnlyOnce(true);
    setFilters(variantArray);
  }, [onlyOnce, filters, setFilters, setOnlyOnce]);
*/
  return (
    <SafeAreaView style={[styles.pageContainer]}>
      <Stack.Screen options={{ title: "Searching" }} />
      <View style={[tw`flex pt-4 justify-center px-6`, { rowGap: 24 }]}>
        <View style={[tw`flex flex-col w-full`, { rowGap: 12 }]}>
          <SearchBar
            search={search}
            onChange={(str: string) => setSearch(str)}
            onBlur={() => {}}
          />
          <View style={[tw`flex flex-row px-3`, { columnGap: 8 }]}>
            {filters.map((item, index) => (
              <Marker
                key={index}
                text={item.text}
                variant={item.color}
                onPress={() => item.setState(!isGlobal)}
                disabled={!item.state}
              />
            ))}
          </View>
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
