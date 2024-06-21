import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Switch,
} from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { Redirect, Stack, router } from "expo-router";
import InputField from "@/src/components/InputField";
import CustomButton from "@/src/components/buttons/CustomButton";
import { createAnimeSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";
import MyToast from "@/src/components/MyToast";
import { IAnime, createAnime } from "@/src/services/anime";

import tw from "@/src/constants/tailwind";
import SwitchField from "@/src/components/Switch";
export default function ChangeEmail() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { user, setUser } = useAuth();

  const { token } = useAuth();
  console.log({ createAnime: token });
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const onSubmit = async (
    title: string,
    studio: string,
    description: string,
    numberOfEpisodes: number,
    allowGaps: boolean
  ) => {
    try {
      console.log({
        title,
        studio,
        description,
        numberOfEpisodes,
        allowGaps,
      });
      const result = await createAnime(
        title,
        studio,
        description,
        numberOfEpisodes,
        allowGaps
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
    resolver: zodResolver(createAnimeSchema),
    shouldUnregister: false,
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
          name={"studio"}
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

        <SwitchField
          label={"Allow Gaps"}
          name={"allowGaps"}
          control={control}
          setValue={setValue}
        />
        <InputField
          label={"Number of episodes"}
          name={"numberOfEpisodes"}
          control={control}
          placeholder="numberOfEpisodes"
          keyboardType="numeric"
          setValue={setValue}
          onlyNumbers
        />
        <View style={tw`flex gap-3 mb-4`}>
          <CustomButton
            text={"Create Anime"}
            onPress={handleSubmit((data: FieldValues | IAnime) =>
              onSubmit(
                data.title,
                data.studio,
                data.description,
                data.numberOfEpisodes,
                data.allowGaps
              )
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
