import { Header } from '@components/Header';
import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/Highlight';
import { Button } from '@components/Button';
import { Inpu } from '@components/Input';

export function NewGroup() {
    return(
        <Container>
            <Header
                showBackButton
            />
            <Content>
                <Icon/>
                <Highlight
                    title='Nova turma'
                    subtitle='Crie uma turma para adicionar as pessoas'
                />

                <Inpu
                    placeholder='Nome da turma'
    
                />

                <Button
                    title='Criar'
                    style={{ marginTop: 20 }}
                />
            </Content>
        </Container>
    );
}