import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Touchable,
  TouchableHighlight,
} from "react-native";
import { ColorsType } from "../constants/Colors";
import tw from "@/src/constants/tailwind";
import { transform } from "@babel/core";

interface EpisodeProps {
  onPress?: () => any;
  number: string;
  active?: boolean;
}

const Episode: React.FC<EpisodeProps> = (props) => {
  const { onPress = () => {}, number, active } = props;

  const bgColor = active ? "bg-yellow-300" : "bg-gray-800";
  const textColor = active ? "text-dark" : "text-white";
  return (
    <TouchableHighlight style={tw`flex mb-10`} onPress={onPress}>
      <View style={tw`relative bg-red-300`}>
        <View
          style={[
            tw`absolute w-18 h-10 ${bgColor}`,
            { transform: [{ rotate: "60deg" }] },
          ]}
        />

        <View
          style={[
            tw`absolute w-18 h-10 ${bgColor}`,
            { transform: [{ rotate: "120deg" }] },
          ]}
        />
        <View
          style={tw`absolute w-18 h-10 ${bgColor} flex items-center justify-center`}
        >
          <Text style={[tw`text-xl ${textColor}  tracking-wider text-center`]}>
            {number}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default Episode;
