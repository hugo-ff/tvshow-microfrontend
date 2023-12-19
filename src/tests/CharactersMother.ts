import { faker } from '@faker-js/faker';

import type { Character } from '../features/tvshow-characters-list/domain/character';

export class CharacterMother {
  static create(params?: Partial<Character>): Character {
    const defaultParams: Character = {
      id: faker.string.uuid(),
      name: faker.person.firstName(),
      imageUrl: faker.image.url(),
      origin: faker.location.country(),
      species: faker.person.jobTitle(),
      location: faker.location.city(),
      ...params,
    };

    return defaultParams;
  }
}

export class CharactersMother {
  static create(length: number, characterMother: typeof CharacterMother): Character[] {
    const charactersArray: Character[] = [];
    const uniqueCharacters: Record<string, boolean> = {};

    while (charactersArray.length < length) {
      const characterObject: Character = characterMother.create();
      const characterKey = `${characterObject.id}-${characterObject.imageUrl}-${characterObject.location}-${characterObject.name}-${characterObject.species}`;

      if (!uniqueCharacters[characterKey]) {
        uniqueCharacters[characterKey] = true;
        charactersArray.push(characterObject);
      }
    }

    return charactersArray;
  }
}
