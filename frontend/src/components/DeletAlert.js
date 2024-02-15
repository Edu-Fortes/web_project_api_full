import { form } from "../utils/constants";
import PopupWithForm from "./PopupWithForm";

export default function DeleteAlert({ isOpen, onClose, onConfirm }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
    onClose();
  }
  return (
    <PopupWithForm
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}
      {...form.deleteAlert}
    />
  );
}
