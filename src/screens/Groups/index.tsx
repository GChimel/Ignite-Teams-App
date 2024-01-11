import { useState } from 'react';
import { FlatList } from 'react-native';
import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {

  const [groups, setGroups] = useState(['Jogadores de Basquete', 'Jogadores de Futebol', 'Jogadores de Tenis', 'Jogadores de Volei']);

  return (
    <Container>
      <Header/>
      <Highlight
        title='Turmas'
        subtitle="TESTE"
      />

      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <GroupCard title={item}
        />)}
      />
      
    </Container>
  );
}