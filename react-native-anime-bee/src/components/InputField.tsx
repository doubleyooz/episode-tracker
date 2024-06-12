import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Themes, ThemeType, ColorsType } from "../constants/Colors";

export interface InputFieldProps {
  required?: boolean;
  control: any;
  name: string;
  label: string;
  error?: string;
  isPassword?: boolean;
  placeholder: string;
  theme?: ThemeType;
  keyboardType: KeyboardTypeOptions;
}

export default function InputField({
  required,
  control,
  name,
  label,
  theme = "light",
  placeholder,
  isPassword,
  keyboardType,
}: InputFieldProps) {
  const [isVisible, setIsValueVisible] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{label}</Text>
          <View
            style={{
              position: "relative",
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                ...(error ? { borderColor: Themes[theme].error } : {}),
              }}
              keyboardType={keyboardType}
              secureTextEntry={isPassword && !isVisible}
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#DFE0DF"
              onChangeText={onChange}
              onBlur={onBlur}
            />
            {isPassword && (
              <View style={styles.hideIconContainer}>
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
            <View style={{ ...styles.errorContainer }}>
              <Text
                style={{
                  color: "red",
                  fontSize: 11,
                  marginTop: -1,
                  marginLeft: 2,
                }}
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

const styles = StyleSheet.create({
  errorContainer: {
    display: "flex",
    flexDirection: "row",
  },

  inputContainer: {
    display: "flex",
    rowGap: 6,
  },
  label: {
    fontSize: 16,
    color: "#000",
    lineHeight: 20,
    fontWeight: "600",
  },
  input: {
    height: 56,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 16,
    borderColor: "#DFE0DF",
    backgroundColor: "white",
    color: "#000",
  },
  hideIconContainer: {
    position: "absolute",
    height: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    right: 16,
    top: 0,
  },
});
