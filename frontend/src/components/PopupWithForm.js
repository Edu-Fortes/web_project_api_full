import closeIcon from "../images/svg/svg_close.svg";

export default function PopupWithForm({
  title,
  name,
  btnText,
  loadingBtnText,
  isOpen,
  isLoading,
  onClose,
  children,
  onSubmit,
}) {
  return (
    <>
      <section id={name} className={isOpen ? "popup popup_opened" : "popup"}>
        <div className="popup__container">
          <button className="button button_close" type="button">
            <img
              src={closeIcon}
              alt="Ícone em form de um X para fechar a janela do formulário"
              className="img img_button_close"
              onClick={onClose}
            />
          </button>
          <form
            name={name}
            className={`popup__form popup__form_${name}`}
            onSubmit={onSubmit}
          >
            <h2 className="popup__title">{title}</h2>
            {children}
            {isLoading ? (
              <button className="button button_save loading" type="submit">
                {loadingBtnText}
              </button>
            ) : (
              <button className="button button_save" type="submit">
                {btnText}
              </button>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
