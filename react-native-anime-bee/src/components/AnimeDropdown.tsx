import { View, FlatList } from "react-native";
import { ColorsType } from "@/src/constants/Colors";
import { Entypo } from "@expo/vector-icons";

import { IAnime } from "@/src/services/anime";
import AnimeCard from "@/src/components/cards/Anime";
import CustomButtom from "@/src/components/CustomButton";

import tw from "@/src/constants/tailwind";
interface AnimeDropdownProps {
  addAction?: () => any;
  marginLeft?: boolean;
  items?: IAnime[];
  variant?: ColorsType;
  dropdown?: boolean;
}

const AnimeDropdown: React.FC<AnimeDropdownProps> = (props) => {
  const { addAction = () => {}, items = [], marginLeft } = props;

  return (
    <View style={[tw`${marginLeft ? "ml-5" : ""}`, { rowGap: 4 }]}>
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
      <View style={tw`flex flex-row justify-center `}>
        <CustomButtom
          icon={<Entypo name="plus" size={30} color="black" />}
          onPress={() => addAction()}
          rounded
          outline
        />
      </View>
    </View>
  );
};

export default AnimeDropdown;
