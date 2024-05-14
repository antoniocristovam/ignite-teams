// Import
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacityProps } from "react-native";

// Styles
import { ButtonIconTypeStylesProps, Container, Icon } from "./styles";

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
