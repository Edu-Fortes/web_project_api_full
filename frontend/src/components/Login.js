import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../utils/auth";

export default function Login({
  tokenData,
  pageButton,
  openAlert,
  handleLoggin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function changeButtontext() {
    pageButton(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    try {
      const res = await auth.signin({ email, password });
      if (res === undefined) {
        openAlert();
        return;
      }
      handleLoggin();
      tokenData(res.token);
      navigate("/");
    } catch (error) {
      console.log("Error to login:", error);
    }
  }

  return (
    <main className="auth">
      <div className="auth__container">
        <form className="form" onSubmit={handleSubmit}>
          <fieldset className="form__item">
            <label className="form__title">Entrar</label>
            <input
              id="email-login"
              name="email"
              className="form__input"
              required
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              id="password-login"
              name="password"
              className="form__input"
              required
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className="form__item">
            <button className="form__button" onSubmit={handleSubmit}>
              Entrar
            </button>
          </fieldset>
        </form>

        <Link to="/signup" className="auth__footer" onClick={changeButtontext}>
          Ainda não é membro? Inscreva-se aqui!
        </Link>
      </div>
    </main>
  );
}
