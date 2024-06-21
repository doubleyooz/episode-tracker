import { View, FlatList, Text } from "react-native";

import { IAnime } from "@/src/services/anime";

import tw from "@/src/constants/tailwind";
import { useAnime } from "../contexts/AnimeContext";
import { router } from "expo-router";
import Episode from "./Episode";
interface EpisodeListProps {
  numberOfEpisodes: number;
  addAnime?: boolean;
}

const EpisodeList: React.FC<EpisodeListProps> = (props) => {
  const { numberOfEpisodes = 0 } = props;
  const { setAnime } = useAnime();

  const episodes = [];

  for (let i = 0; i < numberOfEpisodes; i++) {
    episodes.push(
      <Episode
        key={i}
        onPress={() => {
          router.navigate(`/(home)/episode`);
        }}
        number={i.toString()}
      />
    );
  }

  return (
    <View style={[tw`flex flex-1 bg-red-400 w-96 h-96`, { rowGap: 4 }]}>
      {numberOfEpisodes === 0 ? (
        <Text style={tw`text-base text-center`}>No Episodes to be shown</Text>
      ) : (
        <View style={[tw`relative flex flex-row w-full`, { rowGap: 20 }]}>
          {episodes}
        </View>
      )}
    </View>
  );
};

export default EpisodeList;
