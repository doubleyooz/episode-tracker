import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Switch,
  SafeAreaView,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Redirect, Stack, router } from "expo-router";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/buttons/CustomButton";
import { createListSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";
import MyToast from "@/src/components/MyToast";

import tw from "@/src/constants/tailwind";
import { IList, createList } from "@/src/services/list";
import AnimeDropdown from "@/src/components/AnimeDropdown";
export default function ChangeEmail() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { user, setUser } = useAuth();

  const { token } = useAuth();
  console.log({ createAnime: token });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const onSubmit = async (
    title: string,

    description: string
  ) => {
    try {
      console.log({
        title,

        description,
      });
      const result = await createList(
        title,

        description
      );

      router.back();
    } catch (err: any) {
      console.log({ err: err.response.data.message });
    }
  };

  const { control, handleSubmit, formState, setValue } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      studio: "",
      description: "",
      allowGaps: false,
      numberOfEpisodes: 0,
    },
    resolver: zodResolver(createListSchema),
    shouldUnregister: false,
  });

  return (
    <SafeAreaView style={[styles.pageContainer]}>
      <View style={[tw`flex w-1/2`, { rowGap: 24 }]}>
        <Text style={tw`text-xl font-semibold mb-5`}>{"Create new list"}</Text>

        <InputField
          label={"Title"}
          name={"title"}
          control={control}
          placeholder="Title"
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
        <AnimeDropdown items={[]} />
        <View style={tw`flex gap-3 mb-4`}>
          <CustomButton
            text={"Create List"}
            onPress={handleSubmit((data: FieldValues | IList) =>
              onSubmit(data.title, data.description)
            )}
            uppercase
            disabled={!formState.isValid}
          />
          <CustomButton
            text={"Cancel"}
            onPress={() => router.back()}
            uppercase
            variant="secondary"
          />
        </View>
      </View>
      <MyToast text="Account created" visible={showSuccessToast} />
      <MyToast text="Request failed to send." visible={showErrorToast} />
    </SafeAreaView>
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
