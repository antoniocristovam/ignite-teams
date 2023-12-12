import React, { useState } from "react";
import { Container } from "./styles";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { GroupCard } from "@components/groupCard";
import { FlatList } from "react-native";
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
    </Container>
  );
}
