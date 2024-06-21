import { View, TextInput } from "react-native";
import { Entypo } from "@expo/vector-icons";
import tw from "@/src/constants/tailwind";
interface SearchBarProps {
  onChange?: (data: any) => void;
  onBlur?: () => void;
  search: string;

  placeholder?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const {
    onChange = () => {},
    onBlur = () => {},
    placeholder = "Search",
    search,
    disabled = false,
  } = props;

  return (
    <View
      style={tw`flex w-full flex-row items-center ${
        disabled ? "opacity-50" : ""
      } h-12 rounded-2xl bg-background dark:bg-black border px-3 gap-2`}
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
