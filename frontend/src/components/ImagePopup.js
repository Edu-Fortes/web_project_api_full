import closeIcon from "../images/svg/svg_close.svg";

export default function ImagePopup({ card, onClose }) {
  const figAltString = String(card.alt);
  const figCaption = figAltString.slice(18);

  return (
    <section id="modal-photo" className={card ? "popup popup_opened" : "popup"}>
      <div className="popup__photo-container">
        <button
          className="button button_close button_close_photo"
          type="button"
        >
          <img
            onClick={onClose}
            className="img img_button_close"
            src={closeIcon}
            alt="Ícone em forma de um X para fechar a janela de edição de perfil"
          />
        </button>
        <figure className="popup__fig-container">
          <img className="popup__img" src={card.src} alt={card.alt} />
          <figcaption className="popup__figcaption">{figCaption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
