import { Container } from './styles';
import { TextInputProps } from 'react-native';

export function Inpu({...rest}: TextInputProps) {
    return (
        <Container {...rest}>
            
        </Container>
    );
}