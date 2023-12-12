import React from "react";
import { Container } from "./styles";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { GroupCard } from "@components/groupCard";

export function Groups() {
  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <GroupCard title="Galera do ignite" />
    </Container>
  );
}
