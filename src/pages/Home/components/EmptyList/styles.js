import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;

  p {
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[200]};
    margin-top: 8px;

    strong {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
