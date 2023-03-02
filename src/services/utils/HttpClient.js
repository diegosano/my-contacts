import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path) {
    return this.makeRequest(path, {
      method: 'GET',
    });
  }

  post(path, body) {
    return this.makeRequest(path, {
      method: 'POST',
      body,
    });
  }

  async makeRequest(path, options) {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get('Content-Type');
    let body = null;

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (!response.ok) {
      throw new APIError(response, body);
    }

    return body;
  }
}

export default HttpClient;
