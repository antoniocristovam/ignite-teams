import React from "react";
import { Container } from "./styles";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { ButtonIcon } from "@components/buttonIncon";

export function Players() {
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />
      <ButtonIcon icon="home" type="SECONDARY" />
    </Container>
  );
}
