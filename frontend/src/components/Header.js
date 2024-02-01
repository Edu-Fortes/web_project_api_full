import logo from "../images/svg/svg_logo.svg";

export default function Header({ children }) {
  return (
    <header className="header">
      <figure className="header__fig">
        <img
          src={logo}
          alt="Logo da página EUA
          Afora"
        />
      </figure>
      {children}
    </header>
  );
}
