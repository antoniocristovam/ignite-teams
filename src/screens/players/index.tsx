// Import
import React, { useState } from "react";
import { FlatList } from "react-native";

// Styles
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

// Component
import { Input } from "@components/input";
import { Header } from "@components/header";
import { Filter } from "@components/filter";
import { Button } from "@components/button";
import { Highlight } from "@components/highlight";
import { ListEmpty } from "@components/listInput";
import { PlayerCard } from "@components/playerCard";
import { ButtonIcon } from "@components/buttonIcon";
import { useRoute } from "@react-navigation/native";

export function Players() {
  const [team, setTeam] = useState<string>("Time A");
  const [players, setPlayers] = useState("1");

  type RouterParams = {
    group: string;
  };

  const router = useRoute();
  const { group } = router.params as RouterParams;
  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
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
        ListEmptyComponent={<ListEmpty message="Não há pessoa nesse time." />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 70 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title={"Remover turma"} type="SECONDARY" />
    </Container>
  );
}
