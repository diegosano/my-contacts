import * as S from './styles';

import emptyBox from '../../../../assets/images/empty-box.svg';

export function EmptyList() {
  return (
    <S.Container>
      <img src={emptyBox} alt="Empty box" />

      <p>
        You don&apos;t have any contact registered yet! Click on the
        {' '}
        <strong>&quot;New contact&quot;</strong>
        {' '}
        button above to
        register your first one!
      </p>
    </S.Container>
  );
}
