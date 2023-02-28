import * as S from './styles';

import logo from '../../assets/images/logo.svg';

export function Header() {
  return (
    <S.Container>
      <img src={logo} alt="MyContacts logo" width={201} />

      <S.InputSearchContainer>
        <input type="text" placeholder="Search contact" />
      </S.InputSearchContainer>
    </S.Container>
  );
}
