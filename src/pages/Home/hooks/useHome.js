import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';

import ContactsService from '../../../services/ContactsService';
import { toast } from '../../../utils/toast';
import { useSafeAsyncState } from '../../../hooks/useSafeAsyncState';

export function useHome() {
  const [contacts, setContacts] = useSafeAsyncState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [hasError, setHasError] = useSafeAsyncState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState({});
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.findAll(orderBy);
      setContacts(contactsList);
      setHasError(false);
    } catch {
      setContacts([]);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, setContacts, setHasError, setIsLoading]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'));
  }, []);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const handleTryAgain = useCallback(async () => {
    loadContacts();
  }, [loadContacts]);

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  const handleConfirmDeleteContact = useCallback(async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.delete(contactBeingDeleted.id);

      setContacts(
        (prevState) => prevState.filter((contact) => contact.id !== contactBeingDeleted.id),
      );
      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contact successfully deleted',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'An error occurred while deleting the contact!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }, [contactBeingDeleted.id, handleCloseDeleteModal, setContacts]);

  const filteredContacts = useMemo(
    () => contacts
      .filter(
        (contact) => contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
      ),
    [contacts, deferredSearchTerm],
  );

  return {
    isLoading,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    isLoadingDelete,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  };
}
