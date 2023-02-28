import styled from 'styled-components';

export const Container = styled.div`
margin-bottom: 24px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    span {
      font-weight: 700;
      line-height: 20px;
      color: ${({ theme }) => theme.colors.primary.main};
    }

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }

  h1 {
    font-size: 24px;
  }
`;
