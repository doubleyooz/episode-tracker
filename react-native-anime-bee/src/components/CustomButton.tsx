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

  const colorVariant =
    variant === "secondary" ? `${variant}-200` : `${variant}-500`;
  return (
    <TouchableOpacity
      style={tw`items-center justify-center h-[${size}px] ${
        outline
          ? `border border-${colorVariant} bg-transparent`
          : `bg-${colorVariant}`
      } ${disabled ? "opacity-50" : ""} ${
        rounded ? `rounded-full w-[${size}px]` : `rounded-lg px-4 py-2`
      }`}
      onPress={onPress}
      disabled={disabled}
    >
      {!icon && (
        <Text
          style={tw`text-base tracking-wider font-semibold ${
            outline ? `text-${colorVariant}` : ""
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
