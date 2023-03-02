import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

import * as S from './styles';

import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

export function ToastMessage({ message, onRemoveMessage }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 3000);

    return () => clearTimeout(timeoutId);
  }, [message.duration, message.id, onRemoveMessage]);

  const handleRemoveToast = useCallback(() => {
    onRemoveMessage(message.id);
  }, [message.id, onRemoveMessage]);

  return (
    <S.Container variant={message.type} onClick={handleRemoveToast} role="button" tabIndex={0}>
      {message.type === 'danger' && <img src={xCircle} alt="X icon" />}

      {message.type === 'success' && <img src={checkCircle} alt="Check icon" />}

      <strong>{message.text}</strong>
    </S.Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};