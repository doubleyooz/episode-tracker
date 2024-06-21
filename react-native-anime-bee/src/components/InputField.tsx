import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import tw from "@/src/constants/tailwind";

export interface InputFieldProps {
  required?: boolean;
  control: Control<FieldValues> | undefined;
  name: string;
  label: string;
  error?: string;
  isPassword?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  placeholder: string;
  numberOfLines?: number;
  keyboardType: KeyboardTypeOptions;
}

export default function InputField({
  required,
  control,
  name,
  label,
  placeholder,
  isPassword,
  multiline,
  numberOfLines = 1,
  keyboardType,
  disabled = false,
}: InputFieldProps) {
  const [isVisible, setIsValueVisible] = useState(false);

  const fieldHeight = numberOfLines > 1 ? {} : { height: 56 };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
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
            {required && <Text style={tw`text-red-500`}>*</Text>}
          </View>
          <View style={tw`relative`}>
            <TextInput
              style={[
                tw`px-4 border-[2px] rounded-lg ${
                  error
                    ? "border-red-500"
                    : "border-[#DFE0DD] dark:border-gray-300"
                } text-black dark:text-white bg-white dark:bg-black`,
                fieldHeight,
              ]}
              keyboardType={keyboardType}
              secureTextEntry={isPassword && !isVisible}
              defaultValue={value}
              placeholder={placeholder}
              placeholderTextColor="#DFE0DD"
              editable={!disabled}
              selectTextOnFocus={!disabled}
              multiline={multiline}
              numberOfLines={numberOfLines}
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {isPassword && (
              <View
                style={[
                  tw`absolute flex items-center justify-center right-4 top-0`,
                  fieldHeight,
                ]}
              >
                <TouchableOpacity onPress={() => setIsValueVisible(!isVisible)}>
                  {isVisible ? (
                    <Ionicons
                      name="eye-off-outline"
                      size={24}
                      color={"#747474"}
                    />
                  ) : (
                    <Ionicons name="eye-outline" size={24} color={"#747474"} />
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

          {error && (
            <View style={tw`flex flex-row`}>
              <Text
                style={[
                  tw`text-red-500 ml-0.5 text-[11px]`,
                  {
                    marginTop: -1,
                  },
                ]}
              >
                {`${error.message} ${console.log({ error })}`}
              </Text>
            </View>
          )}
        </View>
      )}
    />
  );
}
