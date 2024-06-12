import { View, ScrollView, Image, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { loginSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { router } from "expo-router";

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
        <Label text="Welcome Back" uppercase fontSize={24} />
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
          onPress={() => router.navigate("/(auth)/forgot")}
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
