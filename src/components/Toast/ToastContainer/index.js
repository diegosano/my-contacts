import { useEffect } from 'react';

import * as S from './styles';
import { ToastMessage } from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';
import { useAnimatedList } from '../../../hooks/useAnimatedList';

export function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    renderList,
  } = useAnimatedList();

  useEffect(() => {
    function addToastFromEvent({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', addToastFromEvent);

    return () => toastEventManager.removeListener('addtoast', addToastFromEvent);
  }, [setMessages]);

  return (
    <S.Container>
      {renderList((message, { isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </S.Container>
  );
}
