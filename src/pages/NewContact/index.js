import { useCallback, useRef } from 'react';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function NewContact() {
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

  return (
    <>
      <PageHeader title="New Contact" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Create"
        onSubmit={handleSubmit}
      />
    </>
  );
}
