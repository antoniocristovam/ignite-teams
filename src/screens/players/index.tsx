// Import
import React, { useState } from "react";
import { Alert, FlatList } from "react-native";

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
import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroup } from "@storage/player/playerGetByGroup";

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [team, setTeam] = useState<string>("Time A");
  const [players, setPlayers] = useState("1");

  type RouterParams = {
    group: string;
  };

  const router = useRoute();
  const { group } = router.params as RouterParams;
  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert("Nova pessoa", "Nome da pessoa é obrigatório.");
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      const players = await playerGetByGroup(group);
      console.log(players);
    } catch (err) {
      if (err instanceof AppError) {
        return Alert.alert("Nova pessoa", err.message);
      } else {
        console.log(err);
        Alert.alert(
          "Nova pessoa",
          "Não foi possível adicionar a pessoa. Tente novamente."
        );
      }
    }
  }
  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
        />
        <ButtonIcon
          onPress={() => {
            console.log("entrou");
            handleAddPlayer();
          }}
          icon="add"
        />
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
