import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Redirect, Stack, router } from "expo-router";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { codeSchema, countdown, forgotSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { useAuth } from "@/src/contexts/AuthContext";
import { changeEmail, recoverEmail } from "@/src/services/auth";
import { useState } from "react";
import Timer from "@/src/components/Countdown";
import MyToast from "@/src/components/MyToast";

import tw from "@/src/constants/tailwind";
export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [isInTimeout, setIsInTimeout] = useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { user, setUser } = useAuth();

  const sendEmail = async (email: string) => {
    if (isInTimeout || !user) return;
    try {
      const result = await recoverEmail(user.email);
      console.log({ result: result.data });
      setNewEmail(email);
      setIsInTimeout(true);
    } catch (err: any) {
      console.log({ err: err.response.data });
      setShowErrorToast(true);
    }
  };

  const validateCode = async (code: string) => {
    try {
      if (newEmail == null || !user) return;

      const result = await changeEmail(user?.email, newEmail, code);
      setIsInTimeout(false);
      console.log({ validateCode: result.data });
      setShowSuccessToast(true);
      setShowErrorToast(false);
      setUser({ ...user, email: newEmail });
      router.navigate("/(config)/settings");
    } catch (err: any) {
      setShowErrorToast(true);
      setShowSuccessToast(false);
      console.log({ err: err.response.data });
    }
  };

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

  const { token } = useAuth();
  console.log({ changeEmailToken: token });
  if (!token) return <Redirect href={"/(auth)/login"} />;
  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <View style={[tw`flex w-1/2`, { rowGap: 24 }]}>
        <Text style={tw`text-3xl font-semibold mb-5`}>
          {"What's your new Email?"}
        </Text>
        <InputField
          label={"New Email"}
          name={"email"}
          control={emailControl}
          placeholder="New Email"
          keyboardType="default"
          disabled={isInTimeout}
          required
        />

        {newEmail && isInTimeout ? (
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

        {newEmail && (
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
      </View>
      <MyToast text="Account created" visible={showSuccessToast} />
      <MyToast text="Request failed to send." visible={showErrorToast} />
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
});
