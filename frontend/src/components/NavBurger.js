import { useNavigate } from "react-router-dom";

export default function NavBurger({
  logout,
  loggedIn,
  tokenData,
  pageButton,
  removeTokenData,
  closeNavburger,
  children,
}) {
  const navigate = useNavigate();

  function signout() {
    logout();
    closeNavburger();
    pageButton(true);
    removeTokenData();
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  return (
    <nav className="navburger">
      <ul className="navburger__item">
        <li className="navburger__email">{loggedIn ? tokenData : ""}</li>
        <li>
          {loggedIn ? (
            <button className="navburger__button" onClick={signout}>
              Sair
            </button>
          ) : (
            children
          )}
        </li>
      </ul>
    </nav>
  );
}
