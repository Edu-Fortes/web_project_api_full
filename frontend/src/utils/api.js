import { urlPaths } from "./constants";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  get(what, authorization) {
    return fetch(`${this._baseUrl}/${what}`, {
      headers: {
        authorization: authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  patch(where, { name, about, link }) {
    return fetch(`${this._baseUrl}/${where}`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
        avatar: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  post(where, { name, link }) {
    return fetch(`${this._baseUrl}/${where}`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  delete(where, what) {
    return fetch(`${this._baseUrl}/${where}/${what}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  put(where, what) {
    return fetch(`${this._baseUrl}/${where}/${what}`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api(urlPaths);

export default api;
