// Import
import React, { useState } from "react";

// Styles
import { Container } from "./styles";

// Component
import { FlatList } from "react-native";
import { Header } from "@components/header";
import { Button } from "@components/button";
import { Highlight } from "@components/highlight";
import { GroupCard } from "@components/groupCard";
import { ListEmpty } from "@components/listInput";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([]);

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        ListEmptyComponent={
          <ListEmpty message="Que tal cadastrar a primeira turma ? (:" />
        }
        renderItem={({ item }) => <GroupCard title={item} />}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />
      <Button title="Criar nova turma" />
    </Container>
  );
}
