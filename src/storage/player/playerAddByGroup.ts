import { AppError } from "@utils/AppError";
import { playerGetByGroup } from "./playerGetByGroup";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  group: string
) {
  try {
    const storedPlayers = await playerGetByGroup(group);

    const playerAlreadyExists = storedPlayers.filter(
      (player) => player.name === newPlayer.name
    );

    if (playerAlreadyExists.length > 0) {
      throw new AppError("Essa pessoa já estar adicionada em um time.");
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);
  } catch (err) {
    throw err;
  }
}
