import React from "react";
import * as Yup from "yup";

import SafeView from "../components/SafeView";

import {AppForm, AppFormField, SubmitButton} from '../components/forms'

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

export default function LoginScreen() {
  return (
    <SafeView>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="email"
          icon="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
        />
        <AppFormField
          name="password"
          placeholder="Password"
          icon="lock"
          secureTextEntry
        />
        <SubmitButton title="Login" />
      </AppForm>
    </SafeView>
  );
}

const styles = StyleSheet.create({
  textInput: {},
});
