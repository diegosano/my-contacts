import { Link } from 'react-router-dom';

import * as S from './styles';
import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { InputSearch } from './components/InputSearch';

import { useHome } from './useHome';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';
import { Header } from './components/Header';

export function Home() {
  const {
    isLoading,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isDeleteModalVisible,
    isLoadingDelete,
    contacts,
    search,
    handleChangeSearch,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch value={search} onChange={handleChangeSearch} />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

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
        </>
      )}
    </S.Container>
  );
}
