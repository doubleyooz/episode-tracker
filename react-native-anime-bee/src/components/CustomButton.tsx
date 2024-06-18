import { TouchableOpacity, Text } from "react-native";
import { ThemeType, ColorsType } from "@/src/constants/Colors";
import { ReactNode } from "react";

interface CustomButtomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPress: () => any;
  text?: string;
  uppercase?: boolean;
  theme?: ThemeType;
  variant?: ColorsType;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  icon?: ReactNode;
  size?: "8" | "9" | "12" | "14";
}

const CustomButtom: React.FC<CustomButtomProps> = (props) => {
  const {
    onPress,
    text = "button",
    uppercase,
    disabled,
    icon,
    rounded,
    outline,
    theme = "light",
    size = "14",
  } = props;

  return (
    <TouchableOpacity
      className={` items-center justify-center h-${size}  ${
        outline
          ? `border border-primary-500 bg-transparent`
          : `bg-${theme}-primary-500`
      } ${disabled ? "opacity-50" : ""} ${
        rounded ? `rounded-full w-${size}` : `rounded-s-2xl px-4 `
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      {!icon && (
        <Text
          className={`text-base tracking-wider font-semibold ${
            outline ? "text-${theme}-primary-500" : ""
          }`}
        >
          {uppercase ? text.toUpperCase() : text}
        </Text>
      )}

      {icon && icon}
    </TouchableOpacity>
  );
};

export default CustomButtom;
