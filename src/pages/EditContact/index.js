import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';
import { Loader } from '../../components/Loader';

import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

export function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        setIsLoading(true);
        const contact = await ContactsService.findOne(id);

        contactFormRef.current.setFieldsValues(contact);
        setContactName(contact.name);
        setIsLoading(false);
      } catch {
        toast({
          type: 'danger',
          text: 'Contact not found',
        });
        history.push('/');
      }
    }

    if (contactFormRef.current) {
      loadContact();
    }
  }, [history, id]);

  const handleSubmit = useCallback(() => {
    //
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title={isLoading ? 'Loading...' : `Edit ${contactName}`} />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Save"
        onSubmit={handleSubmit}
      />
    </>
  );
}
