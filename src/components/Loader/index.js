import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import * as S from './styles';

export function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <S.Overlay>
      <div className="loader" />
    </S.Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
