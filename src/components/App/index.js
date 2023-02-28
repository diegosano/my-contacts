import { ThemeProvider } from 'styled-components';

import * as S from './styles';
import { Header } from '../Header';
import { ContactsList } from '../ContactsList';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <S.Container>
        <Header />

        <ContactsList />
      </S.Container>
    </ThemeProvider>
  );
}
