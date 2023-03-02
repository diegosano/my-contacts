import PropTypes from 'prop-types';
import { useCallback } from 'react';

import * as S from './styles';

import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

export function ToastMessage({ message, onRemoveMessage }) {
  const handleRemoveToast = useCallback(() => {
    onRemoveMessage(message.id);
  }, [message.id, onRemoveMessage]);

  return (
    <S.Container variant={message.type} onClick={handleRemoveToast}>
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
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
