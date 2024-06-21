import { Image, TouchableOpacity, Text, View } from "react-native";
import { ColorsType } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "@/src/constants/tailwind";
interface AnimeCardProps {
  onPress: () => any;
  title: string;
  description: string;
  variant?: ColorsType;
  draggable?: boolean;
}

const AnimeCard: React.FC<AnimeCardProps> = (props) => {
  const {
    onPress,
    title,

    description,
    draggable = false,
    variant = "primary",
  } = props;

  return (
    <TouchableOpacity
      style={tw`flex flex-row self-stretch ${
        variant === "primary" ? `bg-primary-500` : `bg-secondary-300`
      } items-center  min-w-[270px] px-3 h-24 overflow-hidden rounded-lg`}
    >
      <Image
        style={tw`w-[70px] h-[70px]`}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <View style={tw`flex flex-row items-center flex-1 ml-3`}>
        <View style={tw`h-20`}>
          <Text
            style={tw`text-base h-[18px] tracking-wider font-semibold text-black`}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {title}
          </Text>
          <Text
            style={tw`text-sm h-[58px] text-black`}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        </View>
        {draggable && (
          <MaterialIcons
            className=""
            name="drag-indicator"
            size={24}
            color="black"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AnimeCard;
