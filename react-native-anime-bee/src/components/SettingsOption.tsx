import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { ThemeType, ColorsType, Themes } from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";

interface LabelProps {
  onPress?: () => any;
  label: string;
  value: string;
  disabled?: boolean;
  theme?: ThemeType;
}

const SettingsOption: React.FC<LabelProps> = (props) => {
  const { onPress = () => {}, label, value, disabled, theme = "light" } = props;
  const colors = Themes[theme];
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, disabled ? { ...styles.disabled } : {}]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={{
          color: colors.text,
          fontSize: 20,
          letterSpacing: 0.5,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <Text
          style={{
            color: "gray",
            fontSize: 14,
          }}
        >
          {value}
        </Text>

        <Entypo name="chevron-right" size={24} color="gray" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
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

export default SettingsOption;
