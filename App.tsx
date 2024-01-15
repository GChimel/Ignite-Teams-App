import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components'
import { useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading';
import { Groups } from '@screens/Groups';
import theme from '@theme/index';

import { NewGroup } from '@screens/NewGroup';

export default function App() {
  // Lógica de carregamento das fontes
  const [fonstLoad] = useFonts({Roboto_400Regular, Roboto_700Bold});

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {fonstLoad ? <NewGroup/> : <NewGroup/>}
    </ThemeProvider>
  );
}