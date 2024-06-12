import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { loginSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { router } from "expo-router";

export default function LoginScreen() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    console.log("register");
  };

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <View
        style={{ width: "30%", display: "flex", alignItems: "center", gap: 16 }}
      >
        <Image source={require("@/src/assets/images/logo.png")} />
        <Label text="Hop on Board" uppercase fontSize={24} />
      </View>

      <View style={styles.inputContainer}>
        <InputField
          label={"Email"}
          name={"email"}
          control={control}
          placeholder="Email"
          keyboardType="default"
          required
        />

        <InputField
          label={"Username"}
          name={"username"}
          control={control}
          placeholder="username"
          keyboardType="default"
          required
        />

        <InputField
          label={"Password"}
          name={"password"}
          control={control}
          placeholder="Password"
          keyboardType="default"
          isPassword
          required
        />

        <CustomButton
          text={"Login"}
          onPress={handleSubmit(onSubmit)}
          uppercase
          disabled={!formState.isValid}
        />

        <Label
          text={"Already have an account? Sign In"}
          onPress={() => router.navigate("/(auth)/login")}
          fontSize={16}
          disabled={false}
          variant={"primary"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 40,
  },

  inputContainer: {
    display: "flex",
    width: "50%",
    rowGap: 24,
  },
});
