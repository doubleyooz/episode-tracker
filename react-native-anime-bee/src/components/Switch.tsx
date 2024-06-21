import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import tw from "@/src/constants/tailwind";

export interface SwitchFieldProps {
  control: Control<FieldValues> | undefined;
  name: string;
  label: string;
  error?: string;

  disabled?: boolean;
  setValue?: UseFormSetValue<FieldValues>;
}

export default function SwitchField({
  control,
  name,
  label,
  setValue,
  disabled = false,
}: SwitchFieldProps) {
  const [isVisible, setIsValueVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { error },
      }) => (
        <View
          style={[
            tw`flex text-base`,
            { rowGap: 6 },
            disabled ? { opacity: 0.5 } : {},
          ]}
        >
          <View style={[tw`flex flex-row items-center`, { columnGap: 4 }]}>
            <Text style={[tw`text-base font-semibold leading-5 text-black`]}>
              {label}
            </Text>
            {setValue && (
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(val) => setValue(name, val)}
                value={value}
              />
            )}
          </View>
        </View>
      )}
    />
  );
}
