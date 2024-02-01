import { useNavigate } from "react-router-dom";

export default function Navbar({
  logout,
  tokenData,
  removeTokenData,
  loggedIn,
  children,
  pageButton,
}) {
  const navigate = useNavigate();

  function signout() {
    logout();
    pageButton(true);
    removeTokenData();
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  return (
    <nav className="navbar">
      <ul className="navbar__item">
        <li className="navbar__email">{loggedIn ? tokenData : ""}</li>
        <li>
          {loggedIn ? (
            <button className="navbar__button" onClick={signout}>
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
