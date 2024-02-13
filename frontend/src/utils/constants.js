//paths to complete API Base URL
const urlPaths = {
  baseUrl: "https://api.aroundfull.abacusstar.com.au",
  user: "users/me",
  cards: "cards",
  likes: "cards/likes",
  changeAvatar: "users/me/avatar",
};
//forms configuration
const form = {
  profile: {
    name: "profile",
    title: "Editar perfil",
    btnText: "Salvar",
    loadingBtnText: "Salvando",
    nameInput: {
      id: "",
      className: "name",
      type: "text",
      placeholder: "Nome",
      minLength: "2",
      maxLength: "40",
    },
    aboutInput: {
      id: "",
      className: "about",
      type: "text",
      placeholder: "Sobre mim",
      minLength: "2",
      maxLength: "200",
    },
  },
  addPlace: {
    name: "addPic",
    title: "Novo local",
    btnText: "Criar",
    loadingBtnText: "Criando",
    titleInput: {
      id: "title-input",
      className: "place",
      type: "text",
      placeholder: "Título",
      minLength: "2",
      maxLength: "30",
    },
    urlInput: {
      id: "url-input",
      className: "img",
      type: "url",
      placeholder: "Link da imagem",
    },
  },
  changeAvatar: {
    name: "avatar",
    title: "Alterar a foto do perfil",
    btnText: "Salvar",
    loadingBtnText: "Slavando",
    input: {
      id: "avatar-input",
      className: "img",
      type: "url",
      placeholder: "Link da imagem",
    },
  },
  deleteAlert: {
    name: "deleteAlert",
    title: "Tem certeza?",
    btnText: "Sim",
  },
};

export { urlPaths, form };
