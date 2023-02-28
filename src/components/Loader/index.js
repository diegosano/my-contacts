import ReactDOM from 'react-dom';

import * as S from './styles';

export function Loader() {
  return ReactDOM.createPortal(
    <S.Overlay>
      <div className="loader" />
    </S.Overlay>,
    document.getElementById('loader-root'),
  );
}
