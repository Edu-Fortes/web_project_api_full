import { urlPaths } from "./constants";

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  get(what, authorization) {
    return fetch(`${this._baseUrl}/${what}`, {
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  patch(where, authorization, { name, about, link }) {
    return fetch(`${this._baseUrl}/${where}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${authorization}`,
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

  post(where, authorization, { name, link }) {
    return fetch(`${this._baseUrl}/${where}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authorization}`,
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

  delete(where, what, authorization) {
    return fetch(`${this._baseUrl}/${where}/${what}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authorization}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  put(where, what, authorization) {
    return fetch(`${this._baseUrl}/${where}/${what}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authorization}`,
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
