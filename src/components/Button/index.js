import PropTypes from 'prop-types';

import * as S from './styles';
import { Spinner } from '../Spinner';

export function Button({
  type,
  isLoading,
  disabled,
  danger,
  children,
  onClick,
}) {
  return (
    <S.Button
      type={type}
      disabled={isLoading || disabled}
      danger={danger}
      onClick={onClick}
    >
      {isLoading ? <Spinner size={16} /> : children}
    </S.Button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'submit',
  isLoading: false,
  disabled: false,
  danger: false,
  onClick: undefined,
};
