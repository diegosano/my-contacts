import { useCallback, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import ContactsService from '../../../services/ContactsService';
import { toast } from '../../../utils/toast';
import { useSafeAsyncState } from '../../../hooks/useSafeAsyncState';
import { useSafeAsyncAction } from '../../../hooks/useSafeAsyncAction';

export function useEditContact() {
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [contactName, setContactName] = useSafeAsyncState('');
  const contactFormRef = useRef(null);
  const { id } = useParams();
  const history = useHistory();
  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        setIsLoading(true);
        const contact = await ContactsService.findOne(id);

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValues(contact);
          setContactName(contact.name);
          setIsLoading(false);
        });
      } catch {
        safeAsyncAction(() => {
          toast({
            type: 'danger',
            text: 'Contact not found',
          });
          history.push('/');
        });
      }
    }

    if (contactFormRef.current) {
      loadContact();
    }
  }, [history, id, setContactName, setIsLoading, safeAsyncAction]);

  const handleSubmit = useCallback(
    async (contact) => {
      try {
        const contactData = await ContactsService.update(id, contact);

        setContactName(contactData.name);
        toast({
          type: 'success',
          text: 'Contact successfully updated',
        });
      } catch {
        toast({
          type: 'danger',
          text: 'An error occurred while updating the contact!',
        });
      }
    },
    [id, setContactName],
  );

  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  };
}
