import { useCallback } from 'react';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function NewContact() {
  const handleSubmit = useCallback(async (contact) => {
    try {
      await ContactsService.create(contact);

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

      <ContactForm buttonLabel="Create" onSubmit={handleSubmit} />
    </>
  );
}
