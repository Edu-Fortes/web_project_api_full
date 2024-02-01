import trashIcon from "../images/svg/svg_trash.svg";
import likeIcon from "../images/svg/svg_like.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

export default function Card({ onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const cardsArray = useContext(CardContext);

  const cardList = cardsArray.map(function (card) {
    //checks if current user is the card owner
    const isOwn = card.owner._id === currentUser._id;
    //variable to define if trash button is shown or not
    const cardDeleteButtonClassName = `button ${
      isOwn ? "button_trash button_trash_visible" : "button_trash"
    }`;

    //checks if card was liked by current user
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    //defines class name to active or deactive like icon
    const cardLikeButtonClassName = `${isLiked ? "button__like_active" : ""}`;

    function handleLikeClick(e) {
      onCardLike(card);
    }

    function handleDeleteClick() {
      onCardDelete(card);
    }

    return (
      <li key={card._id} className="place__card">
        <div className="place__btn-container">
          <button className={cardDeleteButtonClassName} type="button">
            <img
              onClick={handleDeleteClick}
              className="button__image"
              src={trashIcon}
              alt="Ícone de uma lixeira do botão de excluir postagem"
            />
          </button>
        </div>
        <figure className="place__fig">
          <img
            onClick={onCardClick}
            className="img img_card"
            src={card.link}
            alt={`Imagem da postagem ${card.name}`}
          />
        </figure>
        <div className="place__content">
          <h2 className="place__name">{card.name}</h2>
          <button className="button" type="button">
            <img
              onClick={handleLikeClick}
              className={`button__like ${cardLikeButtonClassName}`}
              src={likeIcon}
              alt="Ícone de coração do botão curtir"
            />
            <span className="button__count">{card.likes.length}</span>
          </button>
        </div>
      </li>
    );
  });

  return <ul className="place">{cardList}</ul>;
}
