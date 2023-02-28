import { Link } from 'react-router-dom';
import * as S from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export function Home() {
  return (
    <S.Container>
      <S.InputSearchContainer>
        <input type="text" placeholder="Search contact" />
      </S.InputSearchContainer>

      <S.Header>
        <strong>3 contacts</strong>

        <Link to="/new">New contact</Link>
      </S.Header>

      <S.ListContainer>
        <header>
          <button type="button">
            <span>Name</span>

            <img src={arrow} alt="Arrow icon" />
          </button>
        </header>

        <S.Card>
          <div className="info">
            <div className="contact-name">
              <strong>Diego Sano</strong>
              <small>Instagram</small>
            </div>

            <span>vedrivop@dodog.mq</span>
            <span>23bb8c6c-daf3-5813-9ad9-d69b9bb517ee</span>
          </div>

          <div>
            <Link to="/edit">
              <img src={edit} alt="Edit icon" />
            </Link>

            <button type="button">
              <img src={trash} alt="Trash icon" />
            </button>
          </div>
        </S.Card>
      </S.ListContainer>
    </S.Container>
  );
}
