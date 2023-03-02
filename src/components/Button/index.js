import PropTypes from 'prop-types';

import * as S from './styles';
import { Spinner } from '../Spinner';

export function Button({
  type, isLoading, disabled, children,
}) {
  return (
    <S.Button type={type} disabled={isLoading || disabled}>
      {isLoading ? <Spinner size={16} /> : children}
    </S.Button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'submit',
  isLoading: false,
  disabled: false,
};
