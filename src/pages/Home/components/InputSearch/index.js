import PropTypes from 'prop-types';

import * as S from './styles';

export function InputSearch({ value, onChange }) {
  return (
    <S.Container>
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search contact"
      />
    </S.Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
