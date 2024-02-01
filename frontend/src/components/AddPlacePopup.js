import PopupWithForm from "./PopupWithForm";
import Fieldset from "./Fieldset";
import { form } from "../utils/constants";
import { useState } from "react";

export default function AddPlacePopup({
  isOpen,
  isLoading,
  onClose,
  onAddPlaceSubmit,
  onBtnClick,
}) {
  const [newCard, setNewCard] = useState({ name: "", link: "" });

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit(newCard);
    onBtnClick();
    handleFormReset();
  }

  function handleFormReset() {
    onClose();
    setNewCard({
      name: "",
      link: "",
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={handleFormReset}
      onSubmit={handleSubmit}
      onBtnClick={onBtnClick}
      {...form.addPlace}
    >
      <Fieldset
        value={newCard.name}
        onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
        {...form.addPlace.titleInput}
      />
      <Fieldset
        value={newCard.link}
        onChange={(e) => setNewCard({ ...newCard, link: e.target.value })}
        {...form.addPlace.urlInput}
      />
    </PopupWithForm>
  );
}
