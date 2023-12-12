import React, { useState } from "react";
import { Container } from "./styles";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { GroupCard } from "@components/groupCard";
import { FlatList } from "react-native";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    "Galera da Rocket",
    "Antonio Cristovam",
  ]);

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
      />
    </Container>
  );
}
