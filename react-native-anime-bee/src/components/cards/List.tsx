import { Image, TouchableOpacity, Text, View, FlatList } from "react-native";
import { ThemeType, ColorsType } from "@/src/constants/Colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { IAnime } from "@/src/services/anime";
import AnimeCard from "./Anime";
import CustomButtom from "../CustomButton";

interface ListCardProps {
  onPress: () => any;
  collapseAction?: () => any;
  title: string;
  description: string;
  theme?: ThemeType;
  items?: IAnime[];
  variant?: ColorsType;
  dropdown?: boolean;
  expanded?: boolean;
  outline?: boolean;
  username?: string;
}

const ListCard: React.FC<ListCardProps> = (props) => {
  const {
    onPress,
    collapseAction = () => {},
    title,
    items = [],
    description,
    dropdown = false,
    variant = "primary",
    theme = "light",
    expanded = false,
    username,
    outline = false,
  } = props;

  const [showItems, setShowItems] = useState(false);

  const handleCollapse = () => {
    collapseAction();
    setShowItems(!showItems);
    console.log({ showItems, dropdown });
  };

  if (expanded)
    return (
      <View
        className={`flex self-stretch  ${
          variant === "primary"
            ? `border-${theme}-primary-500 bg-${theme}-primary-500`
            : `border-${theme}-secondary-300 bg-${theme}-secondary-300`
        } ${
          outline ? "border bg-transparent" : "border-none"
        } items-center min-w-[270px] px-3 pb-3 h-36 overflow-hidden rounded-lg`}
      >
        <View
          className={`flex items-start flex-1 h-20 mt-4`}
          style={{ rowGap: 19 }}
        >
          <View
            className={`flex flex-row items-center`}
            style={{ columnGap: 10 }}
          >
            <Text
              className={`text-base tracking-wider font-semibold text-${theme}-text`}
              numberOfLines={1}
              ellipsizeMode="head"
            >
              {title}
            </Text>
            <Text
              className={`text-sm text-${theme}-text`}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {`${items.length} items`}
            </Text>
          </View>

          {username && (
            <View
              className="flex flex-row flex-1 items-start"
              style={{ columnGap: 10 }}
            >
              <Text
                className={`text-sm w-2/3 text-${theme}-text`}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {description}
              </Text>
              <Text
                className={`text-base text-gray-700 self-end`}
                ellipsizeMode="tail"
              >
                {`@${username}`}
              </Text>
            </View>
          )}

          {!username && (
            <View className="flex flex-row flex-1" style={{ columnGap: 10 }}>
              <Text
                className={`text-sm text-${theme}-text`}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {description}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  return (
    <View className="flex flex-col">
      <View
        className={`flex self-stretch border ${
          variant === "primary"
            ? `border-${theme}-primary-500`
            : `border-${theme}-secondary-300`
        } items-center min-w-[270px] px-3 h-14 overflow-hidden rounded-lg`}
      >
        <View className={`flex flex-row items-center h-10 flex-1 ml-3 `}>
          <Text
            className={`text-base h-[18px]  tracking-wider font-semibold text-${theme}-text`}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {title}
          </Text>
          <View
            className="flex flex-row flex-1 h-10 items-center px-8"
            style={{ columnGap: 2 }}
          >
            <Text
              className={`text-xs text-${theme}-text`}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
            <Text
              className={`text-sm text-${theme}-text`}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {`(${items.length})`}
            </Text>
            {dropdown && (
              <Entypo
                name={showItems ? "chevron-up" : "chevron-down"}
                size={24}
                color="black"
                onPress={() => handleCollapse()}
              />
            )}
          </View>
        </View>
      </View>
      {dropdown && showItems && (
        <View style={{ rowGap: 4, marginLeft: 20 }}>
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
          <View className="flex flex-row justify-center align-center ">
            <CustomButtom
              icon={<Entypo name="plus" size={30} color="black" />}
              onPress={() => console.log("create new anime")}
              rounded
              outline
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default ListCard;
