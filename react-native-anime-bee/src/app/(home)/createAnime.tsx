import { View, ScrollView, Image, Text, StyleSheet } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Redirect, Stack, router } from "expo-router";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/CustomButton";
import { createAnimeSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";
import MyToast from "@/src/components/MyToast";
import { createAnime } from "@/src/services/anime";

import tw from "@/src/constants/tailwind";
export default function ChangeEmail() {
  const [newEmail, setNewEmail] = useState<string | null>(null);
  const [isInTimeout, setIsInTimeout] = useState(false);

  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { user, setUser } = useAuth();

  const { token } = useAuth();
  console.log({ createAnime: token });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const onSubmit = async (
    title: string,
    studio: string,
    description: string
  ) => {
    try {
      const result = await createAnime(title, studio, description);
      console.log(result);
      router.back();
    } catch (err: any) {
      console.log({ err: err.response.data.message });
    }
  };

  const { control, handleSubmit, formState } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      studio: "",
      description: "",
    },
    resolver: zodResolver(createAnimeSchema),
  });

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <View style={[tw`flex w-1/2`, { rowGap: 24 }]}>
        <Text style={tw`text-xl font-semibold mb-5`}>{"Create new anime"}</Text>
        <InputField
          label={"Title"}
          name={"title"}
          control={control}
          placeholder="Title"
          keyboardType="default"
          required
        />

        <InputField
          label={"Studio name"}
          name={"Studio"}
          control={control}
          placeholder="Studio name"
          keyboardType="default"
          required
        />
        <InputField
          label={"Description"}
          name={"description"}
          control={control}
          placeholder="Description"
          keyboardType="default"
          numberOfLines={5}
          multiline
          required
        />
        <CustomButton
          text={"Confirm"}
          onPress={handleSubmit((data) =>
            onSubmit(data.title, data.studio, data.description)
          )}
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
});
