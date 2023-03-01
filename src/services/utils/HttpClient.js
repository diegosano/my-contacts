import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const response = await fetch(`${this.baseURL}${path}`);
    const contentType = response.headers.get('Content-Type');

    let body = null;

    console.log({
      responseOk: response.ok,
      body,
    });

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    console.log({
      responseOk: response.ok,
      body,
    });

    if (!response.ok) {
      throw new APIError(response, body);
    }

    return body;
  }
}

export default HttpClient;
