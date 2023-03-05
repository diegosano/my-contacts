import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16px;

  .details {
    margin-left: 24px;

    strong {
      display: block;
      font-weight: 700;
      font-size: 22px;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.danger.main};
      margin-bottom: 8px;
    }
  }
`;
