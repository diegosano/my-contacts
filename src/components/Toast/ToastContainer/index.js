import { ToastMessage } from '../ToastMessage';
import * as S from './styles';

export function ToastContainer() {
  return (
    <S.Container>
      <ToastMessage text="Default toast" />
      <ToastMessage text="Error toast" type="danger" />
      <ToastMessage text="Success toast" type="success" />
    </S.Container>
  );
}
