import { useState, useEffect } from 'react';

import * as S from './styles';
import { ToastMessage } from '../ToastMessage';

export function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function addToastFromEvent(event) {
      const { type, text } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
        },
      ]);
    }

    document.addEventListener('addtoast', addToastFromEvent);

    return () => document.removeEventListener('addtoast', addToastFromEvent);
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
