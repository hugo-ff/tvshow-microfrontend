import type { Character } from '../../domain/character';
import type { RMApiCharacter } from './interfaces';

export function charactersAdapter(data: RMApiCharacter[]): Character[] {
  const characters: Character[] = [];

  data.forEach((rmCharacter) => {
    const character: Character = {
      id: rmCharacter.id.toString(),
      name: rmCharacter.name,
      imageUrl: rmCharacter.image,
      origin: rmCharacter.origin.name,
      location: rmCharacter.location.name,
      species: rmCharacter.species,
    };
    characters.push(character);
  });

  return characters;
}
