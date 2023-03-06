import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import * as S from './styles';
import { Header } from '../Header';
import { ToastContainer } from '../Toast/ToastContainer';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import { Router } from '../../router';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />

        <S.Container>
          <Header />
          <Router />
        </S.Container>

        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
}
