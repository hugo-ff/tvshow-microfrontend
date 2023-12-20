import logoPng from '../../../assets/logo.png';
import type { CharactersRepository } from '../../../features/tvshow-characters-list/application/characters-repository';
import type { TvShow as TvShowInterface } from '../../../features/tvshow-characters-list/domain/tvshow';
import { useTvShowTranslation } from '../../../hooks/useTvShowTranslation';
import { Spinner } from '../../atoms/Spinner';
import { CharactersList } from '../../organisms/CharactersList';
import { CHARACTERS_PER_PAGE } from './constants';
import { useCharactersRepository } from './hooks/useCharactersRepository';
import styled from './styles';

interface TvShowProps {
  tvshow: TvShowInterface;
  charactersRepository: CharactersRepository;
}

export const TvShow: React.FC<TvShowProps> = ({ tvshow, charactersRepository }) => {
  const t = useTvShowTranslation();
  const { charactersData, isLoadingCharacters } = useCharactersRepository(charactersRepository);

  if (isLoadingCharacters) {
    return <Spinner loadingText={t('LOADING_TEXT')} />;
  }

  // ts-ignore for logoPng "any" type error
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  return (
    <styled.TvShow>
      <div className="tvshow__logo">
        <img src={logoPng} alt={tvshow.title} />
      </div>
      <CharactersList charactersData={charactersData} charactersPerPage={CHARACTERS_PER_PAGE} />
    </styled.TvShow>
  );
};
