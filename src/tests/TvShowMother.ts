import { faker } from '@faker-js/faker';

import type { TvShow } from '../features/tvshow-characters-list/domain/tvshow';

export class TvShowMother {
  static create(params?: Partial<TvShow>): TvShow {
    const defaultParams: TvShow = {
      title: faker.lorem.word(),
      releaseDate: faker.date.birthdate(),
      ...params,
    };

    return defaultParams;
  }
}
