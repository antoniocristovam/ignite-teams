//import
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

//Styles
import { Container, Content, Icon } from "./styles";

// Component
import { Input } from "@components/input";
import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { groupCreate } from "@storage/groups/groupCreate";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleNew() {
    try {
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (err) {
      console.log(err);
    }
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
        <Input placeholder="Nome da turma" onChangeText={setGroup} />
        <Button
          onPress={handleNew}
          title="Criar turma"
          style={{ marginTop: 20 }}
        />
      </Content>
    </Container>
  );
}
