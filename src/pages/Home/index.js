import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then((response) => response.json())
      .then((response) => setContacts(response))
      .catch((error) => console.error(error));
  }, []);

  return (
    <S.Container>
      <S.InputSearchContainer>
        <input type="text" placeholder="Search contact" />
      </S.InputSearchContainer>

      <S.Header>
        <strong>
          {contacts.length}
          {' '}
          {contacts.length === 1 ? 'contact' : 'contacts'}
        </strong>

        <Link to="/new">New contact</Link>
      </S.Header>

      <S.ListContainer>
        <header>
          <button type="button">
            <span>Name</span>

            <img src={arrow} alt="Arrow icon" />
          </button>
        </header>

        {contacts.map((contact) => (
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
      </S.ListContainer>
    </S.Container>
  );
}
