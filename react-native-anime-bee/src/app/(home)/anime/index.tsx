import { FlatList, SafeAreaView, Text, View } from "react-native";
import tw from "@/src/constants/tailwind";
import { useAnime } from "@/src/contexts/AnimeContext";
import { Redirect, router } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import EpisodeList from "@/src/components/EpisodeList";
import RoundedButton from "@/src/components/buttons/RoundedButton";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";

export default function ViewAnimeScreen() {
  const { anime } = useAnime();

  if (!anime) return <Redirect href={"/"} />;

  const { token, user } = useAuth();
  if (!token) return <Redirect href={"/(auth)/login"} />;
  const isCurrentUser = user?.id === anime.userId;
  return (
    <SafeAreaView style={[tw`flex flex-1 flex-col m-0 p-8`, { rowGap: 40 }]}>
      <View style={[tw`flex flex-row justify-between`, { columnGap: 20 }]}>
        <View style={[tw`flex flex-col`, { rowGap: 20 }]}>
          <Text style={tw`text-3xl tracking-wider`}>{anime.title}</Text>
          <Text style={tw`text-base tracking-wider`}>{anime.description}</Text>
          <Text style={tw`text-base tracking-wider text-gray-400`}>
            Studio: {anime.studio}
          </Text>
          <Text style={tw`text-base tracking-wider`}>
            {isCurrentUser
              ? `by ${user?.username}`
              : `number of copies: ${anime.userId} === ${user?.id}`}
          </Text>
        </View>
        <RoundedButton
          action={() => router.navigate("/(home)/anime/editAnime")}
          icon={
            isCurrentUser ? (
              <Entypo name="edit" size={24} color="black" />
            ) : (
              <FontAwesome6 name="copy" size={24} color="black" />
            )
          }
        />
      </View>
      <View style={[tw`flex flex-col`, { rowGap: 20 }]}>
        <Text style={tw`text-base tracking-wider`}>Episodes</Text>

        <View>
          {anime.episodes && anime.episodes?.length >= 0 ? (
            <FlatList
              contentContainerStyle={{ rowGap: 4 }}
              data={anime.episodes}
              renderItem={({ item, index }) => <Text>{item.title}</Text>}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text style={tw`text-sm`}>No Episodes to show</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
