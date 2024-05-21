// Import
import React from "react";

// Styles
import logoImg from "@assets/logo.png";
import { BackButton, BackIcon, Container, Logo } from "./styles";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  function handleBack() {
    navigation.navigate("groups");
  }
  return (
    <Container>
      {showBackButton && (
        <BackButton onPress={handleBack}>
          <BackIcon />
        </BackButton>
      )}

      <Logo source={logoImg} />
    </Container>
  );
}
