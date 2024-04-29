import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";

import ErrorMessage from "./ErrorMessage";

export default function AppFormField({ name, isPassword = false, ...props }) {
  const { errors, touched, setFieldTouched, handleChange } = useFormikContext();
  return (
    <>
      <AppTextInput
        isPassword={isPassword}
        {...props}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
