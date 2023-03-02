import { useState, useEffect } from 'react';

import * as S from './styles';
import { ToastMessage } from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';

export function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function addToastFromEvent({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
        },
      ]);
    }

    toastEventManager.on('addtoast', addToastFromEvent);

    return () => toastEventManager.removeListener('addtoast', addToastFromEvent);
  }, []);

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
      ))}
    </S.Container>
  );
}
