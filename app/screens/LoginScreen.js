import React, { useContext } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import SafeView from "../components/SafeView";
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import auth from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  const authContext = useContext(AuthContext);
  [errorVisible, setErrorVisible] = useState(false);
  [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async ({ email, password }) => {
    const result = await auth.login(email, password);
    if (!result.ok) {
      setErrorMessage(result.data.message);
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
      const user = jwtDecode(result.data.accessToken);
      authContext.setUser(user);
      console.log(user);
      authStorage.storeToken(result.data.accessToken);
    }
  };

  return (
    <SafeView>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage
          error="Invalid email and/or password."
          visible={errorVisible}
        />
        <AppFormField
          name="email"
          icon="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
        />
        <AppFormField name="password" isPassword placeholder="Password" />
        <SubmitButton title="Login" />
      </AppForm>
    </SafeView>
  );
}
