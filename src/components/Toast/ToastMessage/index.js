import PropTypes from 'prop-types';

import * as S from './styles';

import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

export function ToastMessage({ text, type }) {
  return (
    <S.Container variant={type}>
      {type === 'danger' && <img src={xCircle} alt="X icon" />}

      {type === 'success' && <img src={checkCircle} alt="Check icon" />}

      <strong>{text}</strong>
    </S.Container>
  );
}

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
