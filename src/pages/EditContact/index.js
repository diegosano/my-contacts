import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { Loader } from '../../components/Loader';

import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        setIsLoading(true);
        const contactData = await ContactsService.findOne(id);

        setContact(contactData);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Contact not found',
        });
        history.push('/');
      }
    }

    loadContact();
  }, [history, id]);

  const handleSubmit = useCallback(() => {
    //
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title="Edit Contact" />

      <ContactForm buttonLabel="Save" onSubmit={handleSubmit} />
    </>
  );
}
