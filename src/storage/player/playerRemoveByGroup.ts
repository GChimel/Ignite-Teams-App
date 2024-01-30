import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {

    const storage = await playersGetByGroup(group);

    const filtered = storage.filter(player => player.name !== playerName); //retorna todos menos o player que voce quer deletar
    const players = JSON.stringify(filtered);
    
    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players); //atualiza o storage
  } catch (error) {
    throw error;
  }
}