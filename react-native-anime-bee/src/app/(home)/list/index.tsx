import { FlatList, SafeAreaView, Text, View } from "react-native";
import tw from "@/src/constants/tailwind";
import { useAnime } from "@/src/contexts/AnimeContext";
import { Redirect, router } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import EpisodeList from "@/src/components/EpisodeList";
import RoundedButton from "@/src/components/buttons/RoundedButton";
import { Entypo, Feather, FontAwesome6 } from "@expo/vector-icons";
import { useList } from "@/src/contexts/ListContext";
import AnimeDropdown from "@/src/components/AnimeDropdown";

export default function ViewListScreen() {
  const { list } = useList();

  if (!list) return <Redirect href={"/"} />;

  const { token, user } = useAuth();
  if (!token) return <Redirect href={"/(auth)/login"} />;
  const isCurrentUser = user?.id === list.userId;
  return (
    <SafeAreaView style={[tw`flex flex-1 flex-col m-0 p-8`, { rowGap: 40 }]}>
      <View style={[tw`flex flex-row justify-between`, { columnGap: 20 }]}>
        <View style={[tw`flex flex-col`, { rowGap: 20 }]}>
          <Text style={tw`text-3xl tracking-wider`}>{list.title}</Text>
          <Text style={tw`text-base tracking-wider`}>{list.description}</Text>

          <Text style={tw`text-base tracking-wider`}>
            {isCurrentUser
              ? `by ${user?.username}`
              : `number of copies: ${list.userId} === ${user?.id}`}
          </Text>
        </View>
        <RoundedButton
          action={() => router.navigate("/list/editList")}
          icon={
            isCurrentUser ? (
              <Entypo name="edit" size={24} color="black" />
            ) : (
              <FontAwesome6 name="copy" size={24} color="black" />
            )
          }
        />
      </View>
      <AnimeDropdown items={list.animes || []} />
    </SafeAreaView>
  );
}
