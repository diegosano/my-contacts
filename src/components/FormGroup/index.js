import PropTypes from 'prop-types';

import * as S from './styles';

export function FormGroup({ children }) {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
