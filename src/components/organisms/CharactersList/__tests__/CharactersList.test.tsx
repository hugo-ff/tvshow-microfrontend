import userEvent from '@testing-library/user-event';

import { CharacterMother, CharactersMother } from '../../../../tests/CharactersMother';
import { render, screen } from '../../../../tests/test-utils';
import { CHARACTERS_PER_PAGE } from '../../../pages/TvShow/constants';
import { CharactersList } from '../CharactersList';

describe('CharactersList', () => {
  const tvShowCharacters = CharactersMother.create(20, CharacterMother);
  it('should render without errors', async () => {
    render(
      <CharactersList charactersData={tvShowCharacters} charactersPerPage={CHARACTERS_PER_PAGE} />
    );

    expect(await screen.findByRole('searchbox')).toBeInTheDocument();
    expect(await screen.findByRole('navigation')).toBeInTheDocument();

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(CHARACTERS_PER_PAGE);

    cards.forEach((item, index) => {
      expect(item).toHaveTextContent(tvShowCharacters[index].name);
    });
  });

  it('should filter characters on search input', async () => {
    render(
      <CharactersList charactersData={tvShowCharacters} charactersPerPage={CHARACTERS_PER_PAGE} />
    );

    const searchInput = await screen.findByRole('searchbox');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, tvShowCharacters[0].name);

    expect(await screen.findByRole('heading')).toHaveTextContent(tvShowCharacters[0].name);
    expect(await screen.findByRole('heading')).not.toHaveTextContent(tvShowCharacters[1].name);
  });

  it('should show message when no results are found', async () => {
    render(
      <CharactersList charactersData={tvShowCharacters} charactersPerPage={CHARACTERS_PER_PAGE} />
    );

    const searchInput = await screen.findByRole('searchbox');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'NonExistingCharacter');

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('should navigate through pages', async () => {
    render(
      <CharactersList charactersData={tvShowCharacters} charactersPerPage={CHARACTERS_PER_PAGE} />
    );

    const prevPageButton = await screen.findByRole('button', { name: /prev/i });
    expect(prevPageButton).toBeInTheDocument();
    expect(prevPageButton).toBeDisabled();

    const nextPageButton = await screen.findByRole('button', { name: /next/i });
    expect(nextPageButton).toBeInTheDocument();
    expect(nextPageButton).toBeEnabled();

    await userEvent.click(nextPageButton);

    const updatedPrevPageButton = await screen.findByRole('button', { name: /prev/i });
    expect(updatedPrevPageButton).toBeInTheDocument();
    expect(updatedPrevPageButton).toBeEnabled();
  });
});
