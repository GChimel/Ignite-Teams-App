import { useState, useEffect, useRef } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Container, Form, HeaderList, PlayersNumber } from "./styles";
import { Header } from "../../components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { Loading } from "@components/Loading";

  type RouteParams = {
    group: string;
  };

export function Players() {

  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const [newPlayerName, setNewPlayerName] = useState('');

  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null)
  
  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0){
      return Alert.alert('Nova pessoa', 'informe o nome da pessoa para adicionar');
    };
    const newPlayer = {
      name: newPlayerName,
      team,
    };
  
    try {
      await playerAddByGroup(newPlayer, group);
      newPlayerNameInputRef.current?.blur(); //fecha o teclado e tira o foco

      setNewPlayerName(''); //Após adicionar, limpa o campo
      fetchPlayersByTeam();
    }catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar');
        console.log(error);
      };
    };
  };

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playerByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playerByTeam);
    } catch(error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado');
    } finally {
      setIsLoading(false); // Dessa forma caso aconteça algum erro ele finaliza o na busca dos players ele finaliza o loading
    }
  };

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover');
    };
  };

  async function groupRemove() {
    try {
      await groupRemoveByName(group);

      navigation.navigate('groups');
    } catch (error) {
      console.log(error);
      Alert.alert('Remover turma', 'Não foi possível remover a turma');
    }
  };

  async function handleGroupRemove() {
    Alert.alert(
      'Remover',
      'Deseja remover a turma?',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => groupRemove()},
      ],
    );
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight 
        title={group} 
        subtitle="Adicione a galera e separe os times" 
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          value={newPlayerName} //seta o valor da caixa de texto como newPlayerName ('')
          placeholder="Nome da pessoa"
          autoCorrect={false} //Corretor não vai corrigir o nome
          onSubmitEditing={handleAddPlayer} //Executa a função quando o é usada a função do teclado
          returnKeyType="done"
        />
        <ButtonIcon 
          icon="add"
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <Filter title={item} isActive={item === team} onPress={() => setTeam(item)} />}
          horizontal
        />
        <PlayersNumber>{players.length}</PlayersNumber>
      </HeaderList>

      {
        isLoading ? <Loading /> :
        <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PlayerCard name={item.name} onRemove={() => handleRemovePlayer(item.name)} />}
        ListEmptyComponent={() => <ListEmpty message="Não há pessoas nessa turma" />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
        />
        
      }

      <Button 
        type="SECONDARY" 
        title="Remover turma"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
