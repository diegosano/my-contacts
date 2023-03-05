import ContactMapper from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  findAll(orderBy = 'ASC') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  findOne(contactId) {
    return this.httpClient.get(`/contacts/${contactId}`);
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
