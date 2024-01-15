import { Container } from './styles';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

export function Inpu({...rest}: TextInputProps) {

    const {COLORS} = useTheme();

    return (
        <Container 
            placeholderTextColor={COLORS.GRAY_300}
            {...rest}>

        </Container>
    );
}