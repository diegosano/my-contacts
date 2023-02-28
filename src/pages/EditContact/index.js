import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export function EditContact() {
  return (
    <>
      <PageHeader title="Edit Contact" />

      <ContactForm buttonLabel="Save" />
    </>
  );
}
