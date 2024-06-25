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
import { createListSchema } from "@/src/utils/rules";
import Label from "@/src/components/Label";
import { useAuth } from "@/src/contexts/AuthContext";
import { useState } from "react";
import MyToast from "@/src/components/MyToast";

import tw from "@/src/constants/tailwind";
import SwitchField from "@/src/components/Switch";
import { useList } from "@/src/contexts/ListContext";
import { IList, updateList } from "@/src/services/list";
import AnimeDropdown from "@/src/components/AnimeDropdown";
export default function ChangeEmail() {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const { user, setUser } = useAuth();

  const { token } = useAuth();
  if (!token) return <Redirect href={"/(auth)/login"} />;

  const { list, setList } = useList();

  if (!list) return <Redirect href={"/"} />;
  const onSubmit = async (
    title: string,

    description: string
  ) => {
    try {
      const result = await updateList({
        title,
        description,
        id: list.id,
      });
      setList((prev) => ({
        ...prev,
        title,
        description,
        id: list.id,
      }));
      router.back();
    } catch (err: any) {
      console.log({ err: err.response.data.message });
    }
  };

  const { control, handleSubmit, formState, setValue } = useForm<FieldValues>({
    defaultValues: {
      title: list.title,
      description: list.description,
    },
    resolver: zodResolver(createListSchema),
    shouldUnregister: false,
  });

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <View style={[tw`flex w-1/2`, { rowGap: 24 }]}>
        <Text style={tw`text-xl font-semibold mb-5`}>{"Update List"}</Text>

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
        <AnimeDropdown
          items={list.animes || []}
          addAnime
          addAction={() => {}}
        />
        <View style={tw`flex gap-3 mb-4`}>
          <CustomButton
            text={"Update List"}
            onPress={handleSubmit((data: FieldValues | IList) =>
              onSubmit(data.title, data.description)
            )}
            uppercase
            disabled={!formState.isValid}
          />
        </View>
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
});
