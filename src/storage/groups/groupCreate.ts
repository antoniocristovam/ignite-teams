import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    const storageGroups = await groupsGetAll();

    const groupAlreadyExists = storageGroups.includes(newGroupName);

    if (groupAlreadyExists) {
      throw new AppError("Grupo já existe.");
    }

    const storage = JSON.stringify([...storageGroups, newGroupName]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (err) {
    throw err;
  }
}
