import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ThemeType, ColorsType, Themes } from "../constants/Colors";

interface LabelProps {
  onPress?: () => any;
  text: string;
  fontSize: number;
  uppercase?: boolean;
  disabled?: boolean;
  theme?: ThemeType;
  variant?: ColorsType;
}

const Label: React.FC<LabelProps> = (props) => {
  const {
    onPress = () => {},
    text,
    fontSize = 20,
    uppercase,
    disabled = true,
    theme = "light",
    variant = "text",
  } = props;
  const colors = Themes[theme];
  return (
    <TouchableOpacity
      style={[styles.button]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: colors[variant] }, { fontSize }]}>
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

  text: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});

export default Label;
