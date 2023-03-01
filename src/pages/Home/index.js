import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/Button';

import ContactsService from '../../services/ContactsService';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listAll(orderBy);
      setContacts(contactsList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

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

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase())),
    [contacts, search],
  );

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

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
            {contacts.length}
            {' '}
            {contacts.length === 1 ? 'contact' : 'contacts'}
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
                You don&apos;t have any contact registered yet!
                Click on the
                {' '}
                <strong>”New contact”</strong>
                {' '}
                button above to register your first one!
              </p>
            </S.EmptyListContainer>
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

                  {contact.category_name && (
                    <small>{contact.category_name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit icon" />
                </Link>

                <button type="button">
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
