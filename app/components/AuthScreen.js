import React, { useContext } from "react";
import * as Yup from "yup";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";

import SafeView from "./SafeView";
import { AppForm, AppFormField, SubmitButton, ErrorMessage } from "./forms";
import auth from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";
import authApi from "../api/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string(),
});

export default function AuthScreen({ isRegister = false }) {
  const authContext = useContext(AuthContext);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async ({ email, password, confirmPassword }) => {
    if (isRegister && password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      setErrorVisible(true);
      return;
    }
    const apiCall = isRegister ? auth.register : auth.login;
    var result = await apiCall(email, password);
    if (!result.ok) {
      setErrorMessage(result.data.message);
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
      if (isRegister) {
        result = await auth.login(email, password);
      }
      const user = jwtDecode(result.data.accessToken);
      authStorage.storeToken(result.data.accessToken);
      authApi.setAuthToken(result.data.accessToken);
      authContext.setUser(user);
    }
  };

  return (
    <SafeView>
      <AppForm
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={errorMessage} visible={errorVisible} />
        <AppFormField
          name="email"
          icon="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
        />
        <AppFormField name="password" isPassword placeholder="Password" />
        {isRegister && (
          <AppFormField
            name="confirmPassword"
            isPassword
            placeholder="Confirm Password"
          />
        )}
        <SubmitButton title={isRegister ? "Register" : "Login"} />
      </AppForm>
    </SafeView>
  );
}
