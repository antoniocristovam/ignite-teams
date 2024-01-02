import React from "react";
import { Container, Content, Icon } from "./styles";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Button } from "@components/button";

export function NewGroup() {
  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />
        <Button title="Criar turma" />
      </Content>
    </Container>
  );
}
