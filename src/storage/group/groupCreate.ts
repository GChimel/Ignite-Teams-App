import AsyncStorage from "@react-native-async-storage/async-storage";
import { groupsGetAll } from "@storage/groupsGetAll";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroup: string) {
  try {
    const storedGroups = await groupsGetAll();

    // includes verifica se o elemento existe dentro do array
    const groupAlreadyExists = storedGroups.includes(newGroup);

    if (groupAlreadyExists) {
     throw new AppError("Já existe um grupo cadastrado com esse nome.");
    }

    // JSON.stringify transforma o array em string
    const storage = JSON.stringify([...storedGroups, newGroup]);

    await AsyncStorage.setItem(GROUP_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}
