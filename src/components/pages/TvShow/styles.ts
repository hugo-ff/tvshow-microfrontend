import styled from 'styled-components';

const TvShow = styled.section`
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 1rem;

  .tvshow {
    &__logo {
      display: flex;
      justify-content: center;

      img {
        max-width: 100%;
        width: auto;
        height: auto;
      }
    }

    &__title {
      text-align: center;
      font-size: 4rem;
      font-weight: ${(props) => props.theme.typography.fontWeightBold};
    }
  }
`;

export default { TvShow };
