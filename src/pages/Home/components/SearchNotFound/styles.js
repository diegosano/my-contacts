import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 16px;

  p {
    color: ${({ theme }) => theme.colors.gray[200]};
    line-height: 20px;
    margin-left: 24px;
    word-break: break-word;
  }
`;
