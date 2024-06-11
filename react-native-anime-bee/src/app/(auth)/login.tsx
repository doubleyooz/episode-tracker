import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { useState } from "react";
import { router } from "expo-router";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import InputField from "@/src/components/InputField";

export default function LoginScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });

  const handlePasswordValidation = (value: string) => {
    const password = value;
    const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
    const passwordOneNumber = /(?=.*[0-9])/;
    const passwordSixValue = /(?=.{6,})/;

    if (!passwordSpecialCharacter.test(password)) {
      setError({
        ...error,
        password: "Write at least one special character",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordOneNumber.test(password)) {
      setError({
        ...error,
        password: "Write at least one number",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else if (!passwordSixValue.test(password)) {
      setError({
        ...error,
        password: "Write at least 6 characters",
      });
      setUserInfo({ ...userInfo, password: "" });
    } else {
      setError({
        ...error,
        password: "",
      });
      setUserInfo({ ...userInfo, password: value });
    }
  };

  const handleSignIn = async () => { };

  return (
    <ScrollView contentContainerStyle={[styles.pageContainer]}>
      <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
        Welcome Back!
      </Text>
      <Text style={styles.learningText}>
        Login to your existing account of Becodemy
      </Text>
      <View style={styles.inputContainer}>

        <InputField
          label={"Email"}
          value={email}
          setValue={setEmail}
          error={"dsddfdd"}
          placeholder="Email"
          keyboardType="default"
          required
        />
        <InputField
          label={"Password"}
          value={password}
          setValue={setPassword}
          isPassword
          error={"sdadsddsdssdsdsa"}
          placeholder="Password"
          keyboardType="default"
          required
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    alignSelf: "center",
    marginTop: 50,
  },
  pageContainer: {
    display: 'flex', justifyContent: 'center', marginHorizontal: 'auto'
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 24,
  },

  inputContainer: {
    display: 'flex',

    rowGap: 24,
  },
  input: {
    height: 55,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A1",
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 23,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
