import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ColorsType } from "../constants/Colors";
import tw from "@/src/constants/tailwind";

interface MarkerProps {
  onPress?: () => any;
  text: string;

  uppercase?: boolean;
  disabled?: boolean;
  variant?: ColorsType;
}

const Marker: React.FC<MarkerProps> = (props) => {
  const {
    onPress = () => {},
    text,
    uppercase,
    disabled = false,
    variant = "text",
  } = props;

  const bgColor = `bg-${variant}-500`;
  const isPurple = variant === "purple";
  return (
    <TouchableOpacity
      style={[tw`flex items-center justify-center rounded-xl `]}
      onPress={() => onPress()}
    >
      <Text
        style={[
          tw`text-sm ${bgColor} ${
            isPurple ? "text-white" : ""
          } text-center px-3 py-1 rounded-lg ${
            disabled
              ? isPurple
                ? bgColor + "/50 "
                : "bg-transparent border border-secondary-200"
              : ""
          }`,
        ]}
      >
        {uppercase ? text.toUpperCase() : text}
      </Text>
    </TouchableOpacity>
  );
};

export default Marker;
