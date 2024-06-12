import { View, ScrollView, Image, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { forgotSchema, codeSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { router } from "expo-router";
import { useState } from "react";
import Timer from "@/src/components/Countdown";

const countdown = 360;

export default function ForgotScreen() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isInTimeout, setIsInTimeout] = useState(false);
  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: emailFormState,
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotSchema),
  });

  const {
    control: codeControl,
    handleSubmit: handleCodeSubmit,
    formState: codeFormState,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(forgotSchema),
  });

  const sendEmail = async () => {
    if (isInTimeout) return;
    setIsEmailSent(true);
    setIsInTimeout(true);
  };

  const validateCode = async () => {
    setIsInTimeout(false);
  };
  console.log({ codeFormState });
  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <View
        style={{ width: "45%", display: "flex", alignItems: "center", gap: 16 }}
      >
        <Image source={require("@/src/assets/images/logo.png")} />
        <Label text="Type in your email" uppercase fontSize={24} />
      </View>

      <View style={styles.inputContainer}>
        <InputField
          label={"Email"}
          name={"email"}
          control={emailControl}
          placeholder="Email"
          keyboardType="default"
          disabled={isEmailSent && isInTimeout}
          required
        />
        {isEmailSent && isInTimeout ? (
          <Timer
            text="Next attempt in"
            seconds={countdown}
            timerRunning={isInTimeout}
            handleTimeUp={validateCode}
          />
        ) : (
          <CustomButton
            text={"Send Instructions"}
            onPress={handleEmailSubmit(sendEmail)}
            uppercase
            disabled={!emailFormState.isValid}
          />
        )}

        {isEmailSent && (
          <View style={{ display: "flex", rowGap: 24 }}>
            <InputField
              label={"Code"}
              name={"code"}
              control={codeControl}
              placeholder="Code"
              keyboardType="default"
              required
            />
            <CustomButton
              text={"Verify Code"}
              onPress={handleCodeSubmit(validateCode)}
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
          variant={"text"}
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
