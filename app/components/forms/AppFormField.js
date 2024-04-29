import React from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";

import ErrorMessage from "./ErrorMessage";

export default function AppFormField({ name, ...props }) {
  const { errors, touched, setFieldTouched, handleChange } = useFormikContext();
  return (
    <>
      <AppTextInput
        {...props}
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
