import PopupWithForm from "./PopupWithForm";
import { form } from "../utils/constants";
import { useRef } from "react";

export default function EditAvatarPopup({
  onClose,
  isOpen,
  isLoading,
  onUpdateAvatar,
  onBtnClick,
  id,
  className,
  type,
  placeholder,
}) {
  const avatarRef = useRef(null);

  const handleFormReset = () => {
    onClose();
    avatarRef.current.value = "";
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value);
    onBtnClick();
    handleFormReset();
  }
  return (
    <PopupWithForm
      onClose={handleFormReset}
      isOpen={isOpen}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onBtnClick={onBtnClick}
      {...form.changeAvatar}
    >
      <fieldset className="popup__input-container">
        <input
          ref={avatarRef}
          id={id}
          className={`popup__input popup__input_type_${className}`}
          required
          type={type}
          placeholder={placeholder}
        />
        <span className={`${id}-error`}></span>
      </fieldset>
    </PopupWithForm>
  );
}
