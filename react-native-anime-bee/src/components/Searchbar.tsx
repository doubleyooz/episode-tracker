import { View, TextInput } from "react-native";
import { ThemeType, ColorsType, Themes } from "../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import InputField from "./InputField";

interface SearchBarProps {
  onChange?: (data: any) => void;
  onBlur?: () => void;
  search: string;

  placeholder?: string;
  disabled?: boolean;
  theme?: ThemeType;
  variant?: ColorsType;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const {
    onChange = () => {},
    onBlur = () => {},
    placeholder = "Search",
    search,
    disabled = false,
    theme = "light",
    variant = "text",
  } = props;

  return (
    <View
      className={`flex w-full flex-row items-center ${
        disabled ? "opacity-50" : ""
      } h-12 rounded-2xl bg-${theme}-background border px-3`}
      style={{ columnGap: 8 }}
    >
      <Entypo name="magnifying-glass" size={24} color="black" />

      <TextInput
        keyboardType={"default"}
        value={search}
        placeholder={placeholder}
        placeholderTextColor="#DFE0DF"
        editable={!disabled}
        selectTextOnFocus={!disabled}
        onChange={onChange}
        onBlur={onBlur}
      />
    </View>
  );
};

export default SearchBar;
