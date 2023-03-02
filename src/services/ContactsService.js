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
    return this.httpClient.post('/contacts', {
      body: contact,
    });
  }

  update(id, contact) {
    return this.httpClient.put(`/contacts/${id}`, {
      body: contact,
    });
  }
}

export default new ContactsService();
