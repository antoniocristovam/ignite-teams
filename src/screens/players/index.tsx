// Import
import React, { useState } from "react";

// Styles
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

// Component
import { FlatList } from "react-native";
import { Input } from "@components/input";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { ButtonIcon } from "@components/buttonIncon";
import { Filter } from "@components/filter";
import { PlayerCard } from "@components/playerCard";

export function Players() {
  const [team, setTeam] = useState<string>("Time A");
  const [players, setPlayers] = useState(["Antonio", "teste"]);
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
        subtitle="adicione a galera e separe os times"
      />
      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard onRemove={() => {}} name={item} />
        )}
      />
    </Container>
  );
}
