import PropTypes from 'prop-types';

import * as S from './styles';

export function Spinner({ size = 32 }) {
  return <S.Spinner size={size} />;
}

Spinner.propTypes = {
  size: PropTypes.number,
};
