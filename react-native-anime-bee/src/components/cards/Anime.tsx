import { Image, TouchableOpacity, Text, View } from "react-native";
import { Themes, ThemeType, ColorsType } from "@/src/constants/Colors";

interface AnimeCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPress: () => any;
  title: string;
  description: string;
  theme?: ThemeType;
  variant?: ColorsType;
  disabled?: boolean;
  outline?: boolean;
}

const AnimeCard: React.FC<AnimeCardProps> = (props) => {
  const {
    onPress,
    title,
    description,

    variant = "primary",
    theme = "light",
  } = props;

  return (
    <TouchableOpacity
      className={`flex flex-row ${
        variant === "primary"
          ? "bg-light-primary-500"
          : "bg-light-secondary-400"
      } items-center justify-center w-full min-w-[270px] h-24 px-3 py-3  overflow-hidden rounded-lg gap-[10px]`}
    >
      <Image
        className="w-16 h-16"
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
      <View className="h-[70px] w-min-[170px] w-fit ">
        <Text
          className={`text-base h-[18px] tracking-wider font-semibold text-light-text`}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {title}
        </Text>
        <Text
          className={`text-sm h-[52px] w-fit text-light-text`}
          numberOfLines={3}
          ellipsizeMode="head"
        >
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AnimeCard;
