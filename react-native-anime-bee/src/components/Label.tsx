import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ColorsType } from "../constants/Colors";
import tw from "@/src/constants/tailwind";

interface LabelProps {
  onPress?: () => any;
  text: string;
  fontSize: number;
  uppercase?: boolean;
  disabled?: boolean;
  variant?: ColorsType;
}

const Label: React.FC<LabelProps> = (props) => {
  const {
    onPress = () => {},
    text,
    fontSize = 20,
    uppercase,
    disabled = true,
    variant = "text",
  } = props;
  const textColor =
    variant === "text" ? "text-black dark:text-white" : `text-${variant}-500`;
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          { fontSize },
          tw`text-xl ${textColor} tracking-wider text-center`,
        ]}
      >
        {uppercase ? text.toUpperCase() : text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Label;
