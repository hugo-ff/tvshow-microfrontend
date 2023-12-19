import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';

import { TvShow } from './components/pages/TvShow';
import { TVSHOW_TITLE } from './constants';
import { RICK_AND_MORTY_API_BASE_URL } from './features/tvshow-characters-list/infrastructure/rickandmorty/constants';
import { RickAndMortyApiCharactersRepository } from './features/tvshow-characters-list/infrastructure/rickandmorty/rm-api-repository-implementation';
import appInstance from './i18n';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';

const charactersRepository = new RickAndMortyApiCharactersRepository(RICK_AND_MORTY_API_BASE_URL);

export const App = () => (
  <I18nextProvider i18n={appInstance}>
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyle />
      <TvShow tvshow={{ title: TVSHOW_TITLE }} charactersRepository={charactersRepository} />
    </ThemeProvider>
  </I18nextProvider>
);
