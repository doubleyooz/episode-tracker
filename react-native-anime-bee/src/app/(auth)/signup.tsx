import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { signUpSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { Redirect, router } from "expo-router";
import { useAuth } from "@/src/contexts/AuthContext";
import { signUp } from "@/src/services/auth";
import MyToast from "@/src/components/MyToast";
import WelcomeHeader from "@/src/components/WelcomeHeader";

export default function LoginScreen() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { control, handleSubmit, formState } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });
  const { token } = useAuth();
  if (token) return <Redirect href={"/"} />;

  const onSubmit = async (
    email: string,
    username: string,
    password: string
  ) => {
    try {
      await signUp(email, username, password);

      router.navigate("/(auth)/login");
    } catch (err: any) {
      console.log({ err: err.response.data.message });
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <WelcomeHeader text="Hop on Board" />
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
          text={"Sign up"}
          onPress={handleSubmit(
            async (data) =>
              await onSubmit(data.email, data.username, data.password)
          )}
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
        <MyToast text="Account created" visible={showSuccessToast} />
        <MyToast text="Request failed to send." visible={showErrorToast} />
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
