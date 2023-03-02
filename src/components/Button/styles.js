import styled, { css } from 'styled-components';

export const Button = styled.button`
  padding: 0 16px;
  font-size: 16px;
  border: none;
  height: 52px;
  background: ${({ theme }) => theme.colors.primary.main};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  color: #fff;
  font-weight: 700;
  line-height: 20px;
  transition: background-color 0.2s ease-in;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &:disabled {
    background: #ccc !important;
    cursor: default !important;
  }

  ${({ theme, danger }) => danger
    && css`
      background: ${theme.colors.danger.main};

      &:hover {
        background: ${theme.colors.danger.light};
      }

      &:active {
        background: ${theme.colors.danger.dark};
      }
    `}
`;
