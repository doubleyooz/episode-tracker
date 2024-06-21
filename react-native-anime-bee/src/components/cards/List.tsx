import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from "react-native";
import { ColorsType } from "@/src/constants/Colors";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { IAnime } from "@/src/services/anime";
import tw from "@/src/constants/tailwind";
import AnimeDropdown from "../AnimeDropdown";

interface ListCardProps {
  onPress: () => any;
  collapseAction?: () => any;
  title: string;
  description: string;
  items?: IAnime[];
  variant?: ColorsType;
  dropdown?: boolean;
  expanded?: boolean;
  outline?: boolean;
  username?: string;
  addAnime?: boolean;
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
    expanded = false,
    username,
    addAnime = false,
    outline = false,
  } = props;

  const [showItems, setShowItems] = useState(false);
  const [isExpanded, setIsExpanded] = useState(expanded);
  const handleCollapse = () => {
    collapseAction();
    setShowItems(!showItems);
    console.log({ showItems, dropdown });
  };

  if (isExpanded)
    return (
      <TouchableOpacity
        onPress={() => {
          setIsExpanded(!isExpanded);
          onPress();
        }}
        style={tw`flex self-stretch  ${
          variant === "primary"
            ? `border-primary-500 bg-primary-500`
            : `border-secondary-300 bg-secondary-300`
        } ${
          outline ? "border bg-transparent" : "border-none"
        } min-w-[270px] px-3 pb-3 h-36 overflow-hidden rounded-lg`}
      >
        <View style={[tw`flex items-start flex-1 h-20 mt-4`, { rowGap: 19 }]}>
          <View style={[tw`flex flex-row items-center`, { columnGap: 10 }]}>
            <Text
              style={tw`text-base tracking-wider font-semibold text-black`}
              numberOfLines={1}
              ellipsizeMode="head"
            >
              {title}
            </Text>
            <Text
              style={tw`text-sm text-black`}
              numberOfLines={3}
              ellipsizeMode="tail"
            >
              {`${items.length} items`}
            </Text>
          </View>

          {username && (
            <View
              style={[tw`flex flex-row flex-1 items-start`, { columnGap: 10 }]}
            >
              <Text
                style={tw`text-sm w-2/3 text-black`}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {description}
              </Text>
              <Text
                style={tw`text-base text-gray-700 self-end`}
                ellipsizeMode="tail"
              >
                {`@${username}`}
              </Text>
            </View>
          )}

          {!username && (
            <View style={[tw`flex flex-row flex-1`, { columnGap: 10 }]}>
              <Text
                style={tw`text-sm text-black`}
                numberOfLines={3}
                ellipsizeMode="tail"
              >
                {description}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  return (
    <View style={tw`flex flex-col`}>
      <TouchableWithoutFeedback
        onPress={() => {
          setIsExpanded(!isExpanded);
        }}
        style={tw`flex self-stretch relative border ${
          variant === "primary" ? `border-primary-500` : `border-secondary-300`
        } items-center min-w-[270px] px-3 h-14 overflow-hidden rounded-lg`}
      >
        <View style={tw`flex flex-row items-center h-10 flex-1 ml-3 `}>
          <Text
            style={tw`text-base h-[18px] tracking-wider font-semibold text-black`}
            numberOfLines={1}
            ellipsizeMode="head"
          >
            {title}
          </Text>
          <View
            style={[
              tw`flex flex-row flex-1 h-10 items-center px-8`,
              { columnGap: 2 },
            ]}
          >
            <Text
              style={tw`text-xs text-black ${dropdown ? "mr-2" : ""}`}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {description +
                description +
                description +
                description +
                description}
            </Text>
            <View style={tw`flex flex-row items-center absolute right-0`}>
              <Text
                style={tw`text-sm text-black`}
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
      </TouchableWithoutFeedback>
      {dropdown && showItems && (
        <AnimeDropdown
          addAction={() => console.log("add anime")}
          items={items}
          marginLeft
          addAnime={addAnime}
        />
      )}
    </View>
  );
};

export default ListCard;
