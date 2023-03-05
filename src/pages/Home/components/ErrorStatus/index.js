import PropTypes from 'prop-types';

import * as S from './styles';

import { Button } from '../../../../components/Button';

import sad from '../../../../assets/images/sad.svg';

export function ErrorStatus({ onTryAgain }) {
  return (
    <S.Container>
      <img src={sad} alt="Sad face" />

      <div className="details">
        <strong>An error has occurred</strong>

        <Button type="button" onClick={onTryAgain}>
          Try again
        </Button>
      </div>
    </S.Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
