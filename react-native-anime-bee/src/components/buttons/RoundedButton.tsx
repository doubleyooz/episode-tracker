import tw from "@/src/constants/tailwind";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import CustomButtom from "@/src/components/buttons/CustomButton";
interface RoundedButtonProps {
  action: () => any;
  justify?:
    | "center"
    | "flex-start"
    | "flex-end"
    | "between"
    | "around"
    | "evenly";

  size?: string;
}

const RoundedButton: React.FC<RoundedButtonProps> = (props) => {
  const { action, justify = "center", size = "40" } = props;
  return (
    <View style={tw`flex flex-row justify-${justify} `}>
      <CustomButtom
        icon={<Entypo name="plus" size={30} color="black" />}
        onPress={() => {
          console.log("here");
          action();
        }}
        rounded
        size={size}
        outline
      />
    </View>
  );
};

export default RoundedButton;
