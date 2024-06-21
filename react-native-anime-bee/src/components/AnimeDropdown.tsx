import { View, FlatList, Text } from "react-native";
import { ColorsType } from "@/src/constants/Colors";

import { IAnime } from "@/src/services/anime";
import AnimeCard from "@/src/components/cards/Anime";
import CustomButtom from "@/src/components/buttons/CustomButton";

import tw from "@/src/constants/tailwind";
import RoundedButton from "./buttons/RoundedButton";
interface AnimeDropdownProps {
  addAction?: () => any;
  marginLeft?: boolean;
  items?: IAnime[];
  variant?: ColorsType;
  dropdown?: boolean;
  addAnime?: boolean;
}

const AnimeDropdown: React.FC<AnimeDropdownProps> = (props) => {
  const { addAction, items = [], marginLeft, addAnime } = props;

  return (
    <View style={[tw`${marginLeft ? "ml-5" : ""}`, { rowGap: 4 }]}>
      {items.length === 0 ? (
        <Text style={tw`text-base text-center`}>No anime found</Text>
      ) : (
        <FlatList
          contentContainerStyle={{ rowGap: 4 }}
          data={items}
          renderItem={({ item, index }) => (
            <AnimeCard
              onPress={() => {}}
              title={item.title}
              variant={index % 2 === 0 ? "primary" : "secondary"}
              description={item.description}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {addAction && addAnime && <RoundedButton action={() => addAction()} />}
    </View>
  );
};

export default AnimeDropdown;
