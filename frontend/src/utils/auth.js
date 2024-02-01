const BASE_URL = "https://register.nomoreparties.co";

const signup = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 4000) {
        console.log({
          message: "Some thing went wrong. Verify one of the fields.",
        });
      }
      if (res.status === 201) {
        return res.json();
      }
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log("Error message:", err));
};

const signin = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 401) {
        console.log({
          message:
            "User not found. Make sure your e-mail and password is correct",
        });
      }
      if (res.status === 400) {
        console.log({ message: "One or more field not provided" });
        return;
      }
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    })
    .catch((err) => console.log("Error message:", err));
};

const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401) {
        console.log({ message: "User not found. Make sure you are logged in" });
        return;
      }
      return res.json();
    })
    .then((data) => data)
    .catch((error) => {
      console.log("Error checking JWT:", error);
    });
};

export { BASE_URL, signup, signin, checkToken };
