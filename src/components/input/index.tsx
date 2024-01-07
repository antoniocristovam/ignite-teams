// Styles
import { Container } from "./styles";

// Import
import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";

export function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme();
  return <Container placeholderTextColor={COLORS.GRAY_300} {...rest} />;
}
