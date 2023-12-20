import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import type { TvShowLocaleKeys } from '../locales/types';
import type { CustomTFunction } from '../types/types';

export const useTvShowTranslation = (): TFunction & CustomTFunction<TvShowLocaleKeys> => {
  const { t }: { t: TFunction & CustomTFunction<TvShowLocaleKeys> } = useTranslation();

  return t;
};
