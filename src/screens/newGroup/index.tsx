//import
import React from "react";

//Styles
import { Container, Content, Icon } from "./styles";

// Component
import { Input } from "@components/input";
import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";

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
        <Input placeholder="Nome da turma" />
        <Button title="Criar turma" style={{ marginTop: 20 }} />
      </Content>
    </Container>
  );
}
