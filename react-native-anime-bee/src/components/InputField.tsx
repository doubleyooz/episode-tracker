import {
    Entypo,
    Fontisto,
    Ionicons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import {
    KeyboardTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export interface InputFieldProps {
    required?: boolean;
    value: string;
    label: string;
    error?: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    isPassword?: boolean;
    placeholder: string;
    keyboardType: KeyboardTypeOptions;
}

export default function InputField({
    required,
    value,
    label,
    setValue,
    placeholder,
    isPassword,
    keyboardType,
    error,
}: InputFieldProps) {
    const [isVisible, setIsValueVisible] = useState(false);
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={{
                position: "relative",
            }} >
                <TextInput
                    style={{ ...styles.input, ...(error ? { borderColor: "#ff0000aa" } : {}) }}
                    keyboardType={keyboardType}
                    secureTextEntry={isPassword && !isVisible}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#DFE0DF"
                    onChangeText={(value) => setValue(value)}
                />
                {isPassword && (
                    <View style={styles.hideIconContainer}>
                        <TouchableOpacity onPress={() => setIsValueVisible(!isVisible)}>
                            {isVisible ? (
                                <Ionicons name="eye-off-outline" size={24} color={"#747474"} />
                            ) : (
                                <Ionicons name="eye-outline" size={24} color={"#747474"} />
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {
                error && (
                    <View style={{ ...styles.errorContainer }}>
                        <Text
                            style={{ color: "red", fontSize: 11, marginTop: -1, marginLeft: 2 }}
                        >
                            {error}
                        </Text>
                    </View>
                )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        display: "flex",
        flexDirection: "row",
    },

    inputContainer: {
        display: "flex",
        marginHorizontal: 16,
        rowGap: 6,

    },
    label: {
        fontSize: 16,
        color: "#000",
        lineHeight: 20,
        fontWeight: "600",
    },
    input: {
        height: 56,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 2,
        fontSize: 16,
        borderColor: "#DFE0DF",
        backgroundColor: "white",
        color: "#000",
    },
    hideIconContainer: {
        position: "absolute",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        right: 16,
        top: 0,
    },
});
