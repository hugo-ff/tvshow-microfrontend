import userEvent from '@testing-library/user-event';
import { mock } from 'jest-mock-extended';

import { CharactersRepository } from '../../../../features/tvshow-characters-list/application/characters-repository';
import { CharacterMother, CharactersMother } from '../../../../tests/CharactersMother';
import { render, screen } from '../../../../tests/test-utils';
import { TvShowMother } from '../../../../tests/TvShowMother';
import { CHARACTERS_PER_PAGE } from '../constants';
import { TvShow } from '../TvShow';

const mockCharactersRepository = mock<CharactersRepository>();

describe('TvShow', () => {
  const tvshowCharacters = CharactersMother.create(20, CharacterMother);
  const tvshow = TvShowMother.create();
  it('should render without errors', async () => {
    mockCharactersRepository.getAll.mockResolvedValue(tvshowCharacters);

    render(<TvShow tvshow={tvshow} charactersRepository={mockCharactersRepository} />);

    expect(await screen.findByRole('img', { name: tvshow.title })).toBeInTheDocument();
    expect(await screen.findByRole('searchbox')).toBeInTheDocument();
    expect(await screen.findByRole('navigation')).toBeInTheDocument();

    const cards = screen.getAllByRole('heading');
    expect(cards).toHaveLength(CHARACTERS_PER_PAGE);

    cards.forEach((item, index) => {
      expect(item).toHaveTextContent(tvshowCharacters[index].name);
    });
  });

  it('should filter characters on search input', async () => {
    mockCharactersRepository.getAll.mockResolvedValue(tvshowCharacters);

    render(<TvShow tvshow={tvshow} charactersRepository={mockCharactersRepository} />);

    const searchInput = await screen.findByRole('searchbox');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, tvshowCharacters[0].name);

    expect(await screen.findByRole('heading')).toHaveTextContent(tvshowCharacters[0].name);
    expect(await screen.findByRole('heading')).not.toHaveTextContent(tvshowCharacters[1].name);
  });

  it('should show message when no results are found', async () => {
    mockCharactersRepository.getAll.mockResolvedValue(tvshowCharacters);

    render(<TvShow tvshow={tvshow} charactersRepository={mockCharactersRepository} />);

    const searchInput = await screen.findByRole('searchbox');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'NonExistingCharacter');

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it('should navigate through pages', async () => {
    mockCharactersRepository.getAll.mockResolvedValue(tvshowCharacters);

    render(<TvShow tvshow={tvshow} charactersRepository={mockCharactersRepository} />);

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
