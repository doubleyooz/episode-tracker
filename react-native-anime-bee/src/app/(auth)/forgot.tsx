import { View, ScrollView, Image, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { forgotSchema, codeSchema, countdown } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { Redirect, Stack, router } from "expo-router";
import { useState } from "react";
import Timer from "@/src/components/Countdown";
import { useAuth } from "@/src/contexts/AuthContext";
import {
  changePassword,
  recoverPassword,
  verifyCode,
} from "@/src/services/auth";
import WelcomeHeader from "@/src/components/WelcomeHeader";

export default function ForgotScreen() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [isInTimeout, setIsInTimeout] = useState(false);

  const { token } = useAuth();
  if (token) return <Redirect href={"/"} />;

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: emailFormState,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema),
  });

  const {
    control: codeControl,
    handleSubmit: handleCodeSubmit,
    formState: codeFormState,
  } = useForm<FieldValues>({
    defaultValues: {
      code: "",
    },
    resolver: zodResolver(codeSchema),
  });

  const sendEmail = async (email: string) => {
    if (isInTimeout) return;
    await recoverPassword(email);
    setCurrentEmail(email);
    setIsInTimeout(true);
  };

  const validateCode = async (code: string) => {
    try {
      if (currentEmail == null) return;
      setIsInTimeout(false);
      const result = await verifyCode(currentEmail, code);
      console.log({ result });
      setIsChangingPassword(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <Stack.Screen options={{ headerShown: false }} />
      <WelcomeHeader text="Type in your email" width="45%" />
      <View style={styles.inputContainer}>
        <InputField
          label={"Email"}
          name={"email"}
          control={emailControl}
          placeholder="Email"
          keyboardType="default"
          disabled={!!currentEmail && isInTimeout}
          required
        />
        {currentEmail && isInTimeout ? (
          <Timer
            text="Next attempt in"
            seconds={countdown}
            timerRunning={isInTimeout}
            handleTimeUp={() => {
              setIsInTimeout(false);
            }}
          />
        ) : (
          <CustomButton
            text={"Send Instructions"}
            onPress={handleEmailSubmit((data) => sendEmail(data.email))}
            uppercase
            disabled={!emailFormState.isValid}
          />
        )}

        {currentEmail && (
          <View style={{ display: "flex", rowGap: 24 }}>
            <InputField
              label={"Code"}
              name={"code"}
              control={codeControl}
              placeholder="Code"
              keyboardType="decimal-pad"
              required
            />
            <CustomButton
              text={"Verify Code"}
              onPress={handleCodeSubmit((data) => validateCode(data.code))}
              uppercase
              disabled={!codeFormState.isValid}
            />
          </View>
        )}

        <Label
          text={"Don’t you have an account? Sign up"}
          fontSize={16}
          onPress={() => router.navigate("/(auth)/signup")}
          disabled={false}
          variant={"secondary"}
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
