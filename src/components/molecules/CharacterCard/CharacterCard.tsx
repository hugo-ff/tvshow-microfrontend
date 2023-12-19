import { useTranslation } from 'react-i18next';

import { Character } from '../../../features/tvshow-characters-list/domain/character';
import { PLACEHOLDER_IMAGE_URL } from './constants';
import styled from './styles';

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { t } = useTranslation();

  const { imageUrl, origin, location, name, species } = character;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = PLACEHOLDER_IMAGE_URL;
  };

  return (
    <styled.CharacterCard aria-label={name}>
      <article className="character-card">
        <img
          src={imageUrl}
          alt={name}
          className="character-card__image"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="character-card__content">
          <h1 className="character-card__name">{name}</h1>
          <ul className="character-card__attributes">
            {' '}
            {species && (
              <li className="character-card__attribute">
                <span>{t('SPECIES')}</span>
                {species}
              </li>
            )}
            {origin && (
              <li className="character-card__attribute">
                <span>{t('ORIGIN')}</span>
                {origin}
              </li>
            )}
            {location && (
              <li className="character-card__attribute">
                <span>{t('LOCATION')}</span>
                {location}
              </li>
            )}
          </ul>
        </div>
      </article>
    </styled.CharacterCard>
  );
};
