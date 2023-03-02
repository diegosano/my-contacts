import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as S from './styles';
import { Spinner } from '../Spinner';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <S.Overlay>
      <Spinner size={90} />
    </S.Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
