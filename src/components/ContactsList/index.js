import * as S from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export function ContactsList() {
  return (
    <S.Container>
      <S.Header>
        <strong>3 contacts</strong>

        <a href="/">New contact</a>
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
            <a href="/">
              <img src={edit} alt="Edit icon" />
            </a>

            <button type="button">
              <img src={trash} alt="Trash icon" />
            </button>
          </div>
        </S.Card>
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
            <a href="/">
              <img src={edit} alt="Edit icon" />
            </a>

            <button type="button">
              <img src={trash} alt="Trash icon" />
            </button>
          </div>
        </S.Card>
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
            <a href="/">
              <img src={edit} alt="Edit icon" />
            </a>

            <button type="button">
              <img src={trash} alt="Trash icon" />
            </button>
          </div>
        </S.Card>
      </S.ListContainer>
    </S.Container>
  );
}
