import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Redirect, Stack, router } from "expo-router";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { changeUsernameSchema } from "@/src/utils/rules";
import { useAuth } from "@/src/contexts/AuthContext";
import { changeEmail, recoverEmail } from "@/src/services/auth";
import { useState } from "react";
import Timer from "@/src/components/Countdown";
import MyToast from "@/src/components/MyToast";
import { updateUser } from "@/src/services/user";

export default function ChangeEmail() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { user, setUser } = useAuth();

  const onSubmit = async (username: string) => {
    if (!user) return;
    try {
      const result = await updateUser({ username });
      console.log({ result: result.data });
      setUser({ ...user, username: username });
      router.navigate("/(home)/settings");
    } catch (err: any) {
      console.log({ err: err.response.data });
      setShowErrorToast(true);
    }
  };

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
    },
    resolver: zodResolver(changeUsernameSchema),
  });

  const { token } = useAuth();
  console.log({ changeEmailToken: token });
  if (!token) return <Redirect href={"/(auth)/login"} />;
  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <View style={styles.inputContainer}>
        <Text style={[{ fontSize: 24, fontWeight: "600", marginBottom: 20 }]}>
          {"Pick your new Username"}
        </Text>
        <InputField
          label={"New Username"}
          name={"username"}
          control={control}
          placeholder="New Username"
          keyboardType="default"
          required
        />
        <CustomButton
          text={"Update Username"}
          onPress={handleSubmit((data) => onSubmit(data.username))}
          uppercase
          disabled={!formState.isValid}
        />
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

  inputContainer: {
    display: "flex",
    width: "50%",
    rowGap: 24,
  },
});
