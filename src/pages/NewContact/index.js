import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

import { useNewContact } from './hooks/useNewContact';

export function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact();

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
