import { useCallback } from 'react';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';

export function NewContact() {
  const handleSubmit = useCallback(async (contact) => {
    try {
      const response = await ContactsService.create(contact);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <PageHeader title="New Contact" />

      <ContactForm buttonLabel="Create" onSubmit={handleSubmit} />
    </>
  );
}
