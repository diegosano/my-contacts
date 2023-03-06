import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async findAll(signal, orderBy = 'ASC') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`, { signal });

    return contacts.map(ContactMapper.toDomain);
  }

  async findOne(contactId, signal) {
    const contact = await this.httpClient.get(`/contacts/${contactId}`, { signal });

    return ContactMapper.toDomain(contact);
  }

  create(contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.post('/contacts', {
      body,
    });
  }

  update(id, contact) {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.put(`/contacts/${id}`, {
      body,
    });
  }

  delete(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
