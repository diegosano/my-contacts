import { useCallback, useRef } from 'react';

import ContactsService from '../../../services/ContactsService';
import { toast } from '../../../utils/toast';

export function useNewContact() {
  const contactFormRef = useRef(null);

  const handleSubmit = useCallback(async (contact) => {
    try {
      await ContactsService.create(contact);

      contactFormRef.current?.resetFields();

      toast({
        type: 'success',
        text: 'Contact successfully registered',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'An error occurred while registering the contact!',
      });
    }
  }, []);

  return {
    contactFormRef,
    handleSubmit,
  };
}
