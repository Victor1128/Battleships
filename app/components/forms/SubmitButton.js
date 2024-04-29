import { View, Text } from "react-native";
import React from "react";
import AppButton from "../AppButton";
import { useFormikContext } from "formik";

export default function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();
  return <AppButton title={title} onPress={handleSubmit} />;
}
