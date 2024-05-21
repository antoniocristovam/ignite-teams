//import
import React from "react";
import { useNavigation } from "@react-navigation/native";

//Styles
import { Container, Content, Icon } from "./styles";

// Component
import { Input } from "@components/input";
import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";

export function NewGroup() {
  const navigation = useNavigation();
  function handleNew() {
    navigation.navigate("players", { group: "Rocket" });
  }

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
        <Button
          onPress={handleNew}
          title="Criar turma"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
