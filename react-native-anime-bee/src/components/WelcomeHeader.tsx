import { View, Image, DimensionValue } from "react-native";
import Label from "@/src/components/Label";
// Add a Toast on screen.

const welcomeHeader: React.FC<{ text: string; width?: DimensionValue }> = (
  props
) => {
  const { text, width = "30%" } = props;

  return (
    <View style={{ width, display: "flex", alignItems: "center", gap: 16 }}>
      <Image source={require("@/src/assets/images/logo.png")} />
      <Label text={text} uppercase fontSize={24} />
    </View>
  );
};

export default welcomeHeader;
