import { Slot, Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <Stack
          screenOptions={{
            // Hide the header for this route
            headerShown: false,
          }}
        />
      </AuthProvider>
    </RootSiblingParent>
  );
}
