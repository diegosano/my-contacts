import styled from 'styled-components';

export const Select = styled.select`
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  border: none;
  height: 52px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  border: 2px solid #ffffff;
  transition: border-color 0.2s ease-in;
  appearance: none;
  color: ${({ theme }) => theme.colors.gray[900]};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-color: ${({ theme }) => theme.colors.gray[200]};
    color: ${({ theme }) => theme.colors.gray[200]};
    opacity: 1;
  }
`;
