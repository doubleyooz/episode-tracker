import { Image, TouchableOpacity, Text, View } from "react-native";
import { ThemeType, ColorsType } from "@/src/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

interface AnimeCardProps {
  onPress: () => any;
  title: string;
  description: string;
  theme?: ThemeType;
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
    theme = "light",
  } = props;

  return (
    <TouchableOpacity
      className={`flex flex-row self-stretch ${
        variant === "primary"
          ? `bg-light-primary-500`
          : `bg-light-secondary-300`
      } items-center  min-w-[270px] px-3 h-24 overflow- rounded-lg`}
    >
      <Image
        className="w-[70px] h-[70px]"
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <View className={`flex flex-row items-center flex-1 ml-3`}>
        <View className="h-20">
          <Text
            className={`text-base h-[18px] tracking-wider font-semibold text-${theme}-text`}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {title}
          </Text>
          <Text
            className={`text-sm h-[58px] text-${theme}-text`}
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
