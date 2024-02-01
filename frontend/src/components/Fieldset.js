export default function Fieldset({
  id,
  className,
  type,
  placeholder,
  minLength,
  maxLength,
  value,
  onChange,
  ref,
}) {
  return (
    <fieldset className="popup__input-container">
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        id={id}
        className={`popup__input popup__input_type_${className}`}
        required
        type={type}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
      />
      <span className={`${id}-error`}></span>
    </fieldset>
  );
}
