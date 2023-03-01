class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const response = await fetch(`${this.baseURL}${path}`);
    const contentType = response.headers.get('Content-Type');

    let body = null;

    if (contentType.includes('application/json')) {
      body = await response.json();
    }

    if (!response.ok) {
      throw new Error(body?.error || `${response.status} - ${response.statusText}`);
    }

    return body;
  }
}

export default HttpClient;
