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

export default function LoginScreen() {
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async () => {
    console.log("dsds");
  };

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <View
        style={{ width: "30%", display: "flex", alignItems: "center", gap: 16 }}
      >
        <Image source={require("@/src/assets/images/logo.png")} />
        <Label text="Welcome Back" uppercase />
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
          text={"Forgot Password?"}
          fontSize={16}
          disabled={false}
          variant={"primary"}
        />

        <Label
          text={"Don’t you have an account? Sign up"}
          fontSize={16}
          disabled={false}
          variant={"text"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 50,
  },
  pageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 40,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },

  inputContainer: {
    display: "flex",
    width: "50%",
    rowGap: 24,
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 23,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
