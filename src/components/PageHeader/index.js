import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as S from './styles';

import arrow from '../../assets/images/icons/arrow.svg';

export function PageHeader({ title }) {
  return (
    <S.Container>
      <Link to="/">
        <img src={arrow} alt="Arrow icon" />
        <span>Back</span>
      </Link>

      <h1>{title}</h1>
    </S.Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
