import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Themes, ThemeType, ColorsType } from "@/src/constants/Colors";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPress: () => any;
  text: string;
  uppercase?: boolean;
  theme?: ThemeType;
  variant?: ColorsType;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    onPress,
    text,
    uppercase,
    disabled,
    outline,
    variant = "primary",
    theme = "light",
  } = props;

  const colors = Themes[theme];
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[variant] },
        disabled ? { ...styles.disabled } : {},
        outline
          ? {
              ...styles.outline,
              borderColor: colors[variant],
            }
          : {},
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          { color: colors.text },
          outline ? { color: colors[variant] } : {},
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
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 16,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
    backgroundColor: "#f5b849",
  },

  text: {
    fontSize: 16,

    letterSpacing: 0.5,
    fontWeight: "600",
  },
});

export default Button;
