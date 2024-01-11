import { Container } from './styles';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';

export function Groups() {
  return (
    <Container>
      <Header/>
      <Highlight
        title='Turmas'
        subtitle="TESTE"
      />
      <GroupCard
        title='Galera boa'
      />
    </Container>
  );
}