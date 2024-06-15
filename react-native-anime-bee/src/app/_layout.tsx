import { Slot, Stack, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { useState } from "react";

export default function RootLayout() {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <RootSiblingParent>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerLeft: () => (
              <View>
                <TouchableOpacity>
                  <AntDesign
                    name="arrowleft"
                    size={24}
                    color="black"
                    onPress={() => {
                      setShowSettings(false);
                      console.log("goback");
                      router.back();
                    }}
                  />
                </TouchableOpacity>
              </View>
            ),

            headerRight: () => (
              <View>
                <TouchableOpacity>
                  {showSettings ? (
                    <AntDesign
                      name="home"
                      size={24}
                      color="black"
                      onPress={() => {
                        setShowSettings(false);
                        console.log("home");
                        router.replace("/");
                      }}
                    />
                  ) : (
                    <Feather
                      name="menu"
                      size={24}
                      color="black"
                      onPress={() => {
                        setShowSettings(true);
                        console.log("menu");
                        router.navigate("/(home)/settings");
                      }}
                    />
                  )}
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </AuthProvider>
    </RootSiblingParent>
  );
}
