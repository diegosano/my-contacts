import {
  useCallback,
  useEffect,
  // eslint-disable-next-line no-unused-vars
  useMemo,
  useState,
  useTransition,
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
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isPending, startTransition] = useTransition();

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.findAll(orderBy);
      setContacts(contactsList);
      setFilteredContacts(contactsList);
      setHasError(false);
    } catch {
      setContacts([]);
      setFilteredContacts([]);
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
    const { value } = event.target;

    setSearchTerm(value);

    startTransition(() => {
      setFilteredContacts(
        contacts.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase())),
      );
    });
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

  // const filteredContacts = useMemo(
  //   () => contacts
  //     .filter(
  //       (contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //     ),
  //   [contacts, searchTerm],
  // );

  return {
    isPending,
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
