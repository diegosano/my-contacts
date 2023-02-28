import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export function NewContact() {
  return (
    <>
      <PageHeader title="New Contact" />

      <ContactForm buttonLabel="Create" />
    </>
  );
}
