import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import { Loader } from '../../components/Loader';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import ContactsService from '../../services/ContactsService';

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('ASC');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true);
        const contactsList = await ContactsService.listAll(orderBy);
        setContacts(contactsList);
      } catch (error) {
        console.error({
          error,
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadContacts();
  }, [orderBy]);

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'ASC' ? 'DESC' : 'ASC'));
  }

  function handleChangeSearch(event) {
    setSearch(event.target.value);
  }

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase())),
    [contacts, search],
  );

  return (
    <S.Container>
      <Loader isLoading={isLoading} />

      <S.InputSearchContainer>
        <input
          value={search}
          onChange={handleChangeSearch}
          type="text"
          placeholder="Search contact"
        />
      </S.InputSearchContainer>

      <S.Header>
        <strong>
          {contacts.length}
          {' '}
          {contacts.length === 1 ? 'contact' : 'contacts'}
        </strong>

        <Link to="/new">New contact</Link>
      </S.Header>

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

              {contact.category_name && <small>{contact.category_name}</small>}
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
    </S.Container>
  );
}
