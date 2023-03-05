import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as S from './styles';

export function Header({
  hasError,
  quantityOfContacts,
  quantityOfFilteredContacts,
}) {
  // eslint-disable-next-line no-nested-ternary
  const alignment = hasError
    ? 'flex-end'
    : quantityOfContacts > 0
      ? 'space-between'
      : 'center';

  return (
    <S.Container justifyContent={alignment}>
      {!hasError && quantityOfContacts > 0 && (
        <strong>
          {quantityOfFilteredContacts}
          {' '}
          {quantityOfFilteredContacts === 1 ? 'contact' : 'contacts'}
        </strong>
      )}

      <Link to="/new">New contact</Link>
    </S.Container>
  );
}

Header.propTypes = {
  hasError: PropTypes.bool.isRequired,
  quantityOfContacts: PropTypes.number.isRequired,
  quantityOfFilteredContacts: PropTypes.number.isRequired,
};
