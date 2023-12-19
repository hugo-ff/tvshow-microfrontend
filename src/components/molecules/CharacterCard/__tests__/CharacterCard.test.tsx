import { Character } from '../../../../features/tvshow-characters-list/domain/character';
import { render, screen } from '../../../../tests/test-utils';
import { CharacterCard } from '../CharacterCard';

describe('CharacterCard', () => {
  const mockCharacter: Character = {
    id: 'asd123',
    name: 'Rick Sanchez',
    imageUrl: 'https://example.com/rick.jpg',
    species: 'Human',
    location: 'Earth',
    origin: 'Earth',
  };

  it('should render with content', () => {
    render(<CharacterCard character={mockCharacter} />);

    const image = screen.getByRole('img', { name: mockCharacter.name });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockCharacter.imageUrl);

    const title = screen.getByRole('heading', { name: mockCharacter.name });
    expect(title).toBeInTheDocument();

    expect(screen.getByText(mockCharacter.species)).toBeInTheDocument();
  });
});
