import { Slot, Stack, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { useState } from "react";
import { ListProvider } from "../contexts/ListContext";
import { AnimeProvider } from "../contexts/AnimeContext";
import { EpisodeProvider } from "../contexts/EpisodeContext";

export default function RootLayout() {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <RootSiblingParent>
      <AuthProvider>
        <ListProvider>
          <AnimeProvider>
            <EpisodeProvider>
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
                              router.navigate("/(config)/settings");
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  ),
                }}
              />
            </EpisodeProvider>
          </AnimeProvider>
        </ListProvider>
      </AuthProvider>
    </RootSiblingParent>
  );
}
