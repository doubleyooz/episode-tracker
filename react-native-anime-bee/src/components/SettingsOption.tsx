import { TouchableOpacity, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import tw from "@/src/constants/tailwind";
interface LabelProps {
  onPress?: () => any;
  label: string;
  value: string;
  disabled?: boolean;
}

const SettingsOption: React.FC<LabelProps> = (props) => {
  const { onPress = () => {}, label, value, disabled } = props;

  return (
    <TouchableOpacity
      style={[
        tw`flex flex-row w-full ${
          disabled ? "opacity-50" : ""
        } px-3 items-center justify-between`,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={tw`text-xl font-semibold tracking-wider`}>{label}</Text>
      <View style={tw`flex flex-row items-center gap-3`}>
        <Text style={tw`text-sm text-gray-600 dark:text-gray-300`}>
          {value}
        </Text>

        <Entypo name="chevron-right" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

export default SettingsOption;
