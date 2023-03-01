import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listAll(orderBy = 'ASC') {
    return this.httpClient.get(
      `/contactss?orderBy=${orderBy}`,
    );
  }
}

export default new ContactsService();
