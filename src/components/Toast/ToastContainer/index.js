import { useState, useEffect, useCallback } from 'react';

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

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }, []);

  return (
    <S.Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </S.Container>
  );
}
