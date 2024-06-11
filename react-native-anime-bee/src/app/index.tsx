import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
    return <Redirect href={"/(auth)/login"} />;

    return (
        <View style={styles.titleContainer}>
            <Text>Hello World</Text>
            <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});