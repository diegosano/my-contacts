import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';

import ContactsService from '../../services/ContactsService';
import { toast } from '../../utils/toast';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import { useSafeAsyncState } from '../../hooks/useSafeAsyncState';

export function Home() {
  const [contacts, setContacts] = useSafeAsyncState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useSafeAsyncState(true);
  const [hasError, setHasError] = useSafeAsyncState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState({});
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.findAll(orderBy);
      setContacts(contactsList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy, setContacts, setHasError, setIsLoading]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'));
  }

  function handleChangeSearch(event) {
    setSearch(event.target.value);
  }

  const handleTryAgain = useCallback(async () => {
    loadContacts();
  }, [loadContacts]);

  function handleDeleteContact(contact) {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted({});
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
  }, [contactBeingDeleted.id, handleCloseDeleteModal]);

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase())),
    [contacts, search],
  );

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

      <Modal
        title={`Are you sure you want to remove the contact ”${contactBeingDeleted?.name}”?`}
        confirmLabel="Delete"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        visible={isDeleteModalVisible}
        isLoading={isLoadingDelete}
        danger
      >
        <p>This action cannot be undone!</p>
      </Modal>

      {contacts.length > 0 && (
        <S.InputSearchContainer>
          <input
            value={search}
            onChange={handleChangeSearch}
            type="text"
            placeholder="Search contact"
          />
        </S.InputSearchContainer>
      )}

      <S.Header
        justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError
            ? 'flex-end'
            : contacts.length > 0
              ? 'space-between'
              : 'center'
        }
      >
        {!hasError && contacts.length > 0 && (
          <strong>
            {filteredContacts.length}
            {' '}
            {filteredContacts.length === 1 ? 'contact' : 'contacts'}
          </strong>
        )}

        <Link to="/new">New contact</Link>
      </S.Header>

      {hasError && (
        <S.ErrorContainer>
          <img src={sad} alt="Sad face" />

          <div className="details">
            <strong>An error has occurred</strong>

            <Button type="button" onClick={handleTryAgain}>
              Try again
            </Button>
          </div>
        </S.ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts.length === 0 && !isLoading && (
            <S.EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />

              <p>
                You don&apos;t have any contact registered yet! Click on the
                {' '}
                <strong>&quot;New contact&quot;</strong>
                {' '}
                button above to
                register your first one!
              </p>
            </S.EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacts.length === 0 && (
            <S.SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Question icon" />

              <p>
                No results found for
                {' '}
                <strong>
                  &quot;
                  {search}
                  &quot;
                </strong>
                .
              </p>
            </S.SearchNotFoundContainer>
          )}

          {filteredContacts.length > 0 && (
            <S.ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Name</span>

                <img src={arrow} alt="Arrow icon" />
              </button>
            </S.ListHeader>
          )}

          {filteredContacts.map((contact) => (
            <S.Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>

                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit icon" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src={trash} alt="Trash icon" />
                </button>
              </div>
            </S.Card>
          ))}
        </>
      )}
    </S.Container>
  );
}
