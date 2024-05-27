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
import { useNavigation, useRoute } from "@react-navigation/native";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";

// Storage/Functions
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { groupRemoveByName } from "@storage/groups/groupRemoveByName";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { Loading } from "@components/loading";

export function Players() {
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState<string>("Time A");
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  type RouterParams = {
    group: string;
  };

  // Hooks
  const router = useRoute();
  const navigate = useNavigation();
  const { group } = router.params as RouterParams;

  // Refs
  const newPlayerNameInputRes = useRef<TextInput>(null);

  // Functions
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
      setIsLoading(true);
      const playerByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
      setIsLoading(false);
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

  async function groupRemove() {
    try {
      await groupRemoveByName(group);

      navigate.navigate("groups");
    } catch (err) {
      console.log(err);
      Alert.alert("Turma", "Não foi possível remover o Grupo.");
    }
  }

  async function handleRemoveGroup() {
    Alert.alert("Remover turma", "Tem certeza que deseja remover o grupo?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => groupRemove(),
      },
    ]);
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
      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      <Button
        onPress={() => handleRemoveGroup()}
        title={"Remover turma"}
        type="SECONDARY"
      />
    </Container>
  );
}
