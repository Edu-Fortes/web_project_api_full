export default function LoadingProfile() {
  return (
    <section className="profile">
      <div className="profile__item">
        <figure className="profile__fig">
          <img className="img img_avatar skeleton skeleton_avatar" alt="." />)
        </figure>
        <ul className="profile__description">
          <li className="list-container">
            <h1 className="profile__title skeleton skeleton_title">
              Carregando conteúdo
            </h1>
            <button
              className="button button_edit skeleton button_hidde"
              type="button"
              title="Botão Editar"
            />
          </li>
          <li>
            <h2 className="profile__subtitle skeleton skeleton_subtitle">
              Carregando conteúdo
            </h2>
          </li>
        </ul>
      </div>
      <button
        className="button button_add skeleton button_hidde"
        type="button"
        title="Botão Adicionar"
      />
    </section>
  );
}
