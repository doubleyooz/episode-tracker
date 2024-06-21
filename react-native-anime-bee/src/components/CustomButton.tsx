import { ReactNode } from "react";
import { TouchableOpacity, Text } from "react-native";

import tw from "@/src/constants/tailwind";
import { ColorsType } from "@/src/constants/Colors";

interface CustomButtomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onPress: () => any;
  text?: string;
  uppercase?: boolean;
  variant?: ColorsType;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  icon?: ReactNode;
  size?: string;
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
    variant = "primary",
    size = "56",
  } = props;

  return (
    <TouchableOpacity
      style={tw`items-center justify-center h-[${size}px] ${
        outline
          ? `border border-${variant}-500 bg-transparent`
          : `bg-${variant}-500`
      } ${disabled ? "opacity-50" : ""} ${
        rounded ? `rounded-full w-[${size}px]` : `rounded-lg px-4 py-2`
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      {!icon && (
        <Text
          style={tw`text-base tracking-wider font-semibold ${
            outline ? `text-${variant}-500` : ""
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
