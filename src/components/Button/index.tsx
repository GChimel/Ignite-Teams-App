import { Container, ButtonTitle, ButtonTypeStyleProps} from './styles';
import { TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
    type?: ButtonTypeStyleProps;
    title: string;
}

export function Button({title, type = 'PRIMARY', ...rest}: Props) {
    return(
        <Container type={type} {...rest}>
            <ButtonTitle>{title}</ButtonTitle>
        </Container>
    );
}