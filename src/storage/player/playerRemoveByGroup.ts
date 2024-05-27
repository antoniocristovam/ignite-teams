import { playerGetByGroup } from "./playerGetByGroup";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playerGetByGroup(group);

    const filteredStorage = storage.filter(
      (player) => player.name !== playerName
    );

    const players = JSON.stringify(filteredStorage);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);
  } catch (err) {
    throw err;
  }
}
