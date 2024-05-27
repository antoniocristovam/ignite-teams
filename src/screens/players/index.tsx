// Import
import React, { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";

// Styles
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

// Component
import { Input } from "@components/input";
import { AppError } from "@utils/AppError";
import { Header } from "@components/header";
import { Filter } from "@components/filter";
import { Button } from "@components/button";
import { Highlight } from "@components/highlight";
import { ListEmpty } from "@components/listInput";
import { PlayerCard } from "@components/playerCard";
import { ButtonIcon } from "@components/buttonIcon";
import { useRoute } from "@react-navigation/native";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";

export function Players() {
  const [team, setTeam] = useState<string>("Time A");
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  type RouterParams = {
    group: string;
  };

  const router = useRoute();
  const { group } = router.params as RouterParams;
  const newPlayerNameInputRes = useRef<TextInput>(null);
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
      newPlayerNameInputRes.current?.blur();
      setNewPlayerName("");
      fetchPlayersByTeam();
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

  async function fetchPlayersByTeam() {
    try {
      const playerByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch (err) {
      console.log(err);
      Alert.alert("Pessoa", "Não foi possível carregar as pessoas.");
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (err) {
      Alert.alert("Pessoa", "Não foi possível remover a pessoa.");
    }
  }

  useEffect(() => {
    console.log("entrou");

    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          inputRef={newPlayerNameInputRes}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          value={newPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard
            onRemove={() => handleRemovePlayer(item.name)}
            name={item.name}
          />
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
