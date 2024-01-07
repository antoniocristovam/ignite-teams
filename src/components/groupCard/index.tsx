// Import
import React from "react";
import { TouchableOpacityProps } from "react-native";

// Styles
import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export function GroupCard({ title, ...rest }: Props) {
  return (
    <Container {...rest}>
      <Icon />
      <Title>{title}</Title>
    </Container>
  );
}
