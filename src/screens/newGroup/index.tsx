//import
import { Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

//Styles
import { Container, Content, Icon } from "./styles";

// Component
import { Input } from "@components/input";
import { AppError } from "@utils/AppError";
import { Button } from "@components/button";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { groupCreate } from "@storage/groups/groupCreate";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  async function handleNew() {
    try {
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Nome do grupo não pode ser vazio.");
      }

      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (err) {
      if (err instanceof AppError) {
        Alert.alert("Novo Grupo", err.message);
      } else {
        Alert.alert("Novo Grupo", "Erro ao criar novo grupo.");
      }
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
