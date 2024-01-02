import { TouchableOpacityProps } from "react-native";
import { Container, Icon } from "./styles";
import React from "react";

type Props = TouchableOpacityProps & {};
export function ButtonIcon({}: Props) {
  return (
    <Container>
      <Icon name="home" type="PRIMARY" />
    </Container>
  );
}
