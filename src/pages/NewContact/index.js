import { useCallback } from 'react';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';

export function NewContact() {
  const handleSubmit = useCallback(async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

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
