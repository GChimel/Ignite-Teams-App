import { useNavigation } from '@react-navigation/native';
import { Container, Logo, BackButton, BackIcon} from './styles';
import logoImg from '@assets/logo.png';

// Interrogação no props significa que ela é opcional 
type Props = {
    showBackButton?: boolean;
}

export function Header({ showBackButton = false}: Props) {

    const navigation = useNavigation()
    function handleGoBack() {
       navigation.navigate('groups'); 
    }

    return(
        <Container>
            {
            // Se o showBackButton for verdadeiro então...
            showBackButton &&
            <BackButton onPress={handleGoBack}>
                <BackIcon/>
            </BackButton>
            }
            <Logo
                source={logoImg}
            />
        </Container>
    );
}