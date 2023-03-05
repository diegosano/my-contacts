import PropTypes from 'prop-types';

import * as S from './styles';

import magnifierQuestion from '../../../../assets/images/magnifier-question.svg';

export function SearchNotFound({ searchTerm }) {
  return (
    <S.Container>
      <img src={magnifierQuestion} alt="Question icon" />

      <p>
        No results found for
        {' '}
        <strong>
          &quot;
          {searchTerm}
          &quot;
        </strong>
        .
      </p>
    </S.Container>
  );
}

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
