export default function PageButton({ pageButton }) {
  return (
    <button type="button" className="navbar__button">
      {pageButton ? "Entrar" : "Faça o login"}
    </button>
  );
}
