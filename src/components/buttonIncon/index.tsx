import { TouchableOpacityProps } from "react-native";
import { ButtonIconTypeStylesProps, Container, Icon } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypeStylesProps;
};
export function ButtonIcon({ icon, type = "PRIMARY", ...rest }: Props) {
  return (
    <Container>
      <Icon name={icon} type={type} />
    </Container>
  );
}
