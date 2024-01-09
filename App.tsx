import { ActivityIndicator } from 'react-native'
import { Groups } from '@screens/Groups';
import { ThemeProvider } from 'styled-components'
import theme from '@theme/index';

import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'


export default function App() {

  // Lógica de carregamento das fontes
  const [fonstLoad] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <ThemeProvider theme={theme}>
      {fonstLoad ? <Groups/> : <ActivityIndicator/>}
    </ThemeProvider>
  );
}