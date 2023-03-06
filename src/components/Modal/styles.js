import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const scaleOut = keyframes`
  from {
    transform: scale(1);
  }

  to {
    transform: scale(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3.5px);
  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.2s forwards;
  `}
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  max-width: 450px;
  width: 100%;
  animation: ${scaleIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${scaleOut} 0.3s forwards;
  `}

  > h1 {
    font-weight: 700;
    font-size: 22px;
    line-height: 28px;
    color: ${({ theme, danger }) => (danger ? theme.colors.danger.main : theme.colors.gray[900])}
  }

  .modal-body {
    margin-top: 32px;
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 24px;
    color: ${({ theme }) => theme.colors.gray[200]};
    transition: color 0.2s ease-in;

    &:hover {
      color: ${({ theme }) => theme.colors.gray[900]};
    }

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
