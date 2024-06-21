import { View, ScrollView, Image, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Redirect, Stack, router } from "expo-router";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/buttons/CustomButton";
import { loginSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { useAuth } from "@/src/contexts/AuthContext";
import WelcomeHeader from "@/src/components/WelcomeHeader";

export default function LoginScreen() {
  const { control, handleSubmit, formState } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { handleSignIn, token } = useAuth();

  const onSubmit = async (email: string, password: string) => {
    try {
      await handleSignIn(email, password);
      router.navigate("/");
    } catch (err: any) {
      console.log({ err });
      console.log({ err: err.response.data.message });
    }
  };
  if (token) return <Redirect href={"/"} />;
  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <Stack.Screen options={{ headerShown: false }} />
      <WelcomeHeader text="Welcome Back" />
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
          onPress={handleSubmit(
            async (data) => await onSubmit(data.email, data.password)
          )}
          uppercase
          disabled={!formState.isValid}
        />

        <Label
          text={"Forgot Password?"}
          fontSize={16}
          onPress={() => router.navigate("/(auth)/forgot")}
          disabled={false}
          variant={"primary"}
        />

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
