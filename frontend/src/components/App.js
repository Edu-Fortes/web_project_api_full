import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { form, urlPaths } from "../utils/constants";
import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import Navbar from "./Navbar";
import * as auth from "../utils/auth";
import PageButton from "./PageButton";
import InfoTooltip from "./InfoTooltip";
import NavBurgerButton from "./NavBurgerButton";
import NavBurger from "./NavBurger";
import DeleteAlert from "./DeletAlert";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState();
  const [isRight, setIsRight] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState("");
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenData, setTokenData] = useState("");
  const [pageButton, setPageButton] = useState(true);
  const [isNavburgerOpen, setIsNavburgerOpen] = useState(false);
  const [authorization, setAuthorization] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setAuthorization(token);

    if (token) {
      //check if user is logged in
      async function handleCheckToken() {
        const res = await auth.checkToken(token);
        try {
          if (res === undefined) {
            return;
          }
          setTokenData(res.email);
          setLoggedIn(true);
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      }
      //fetch user data from server
      api
        .get(urlPaths.user, token)
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingProfile(false));
      //fetch card list from server
      api
        .get(urlPaths.cards, token)
        .then((res) => {
          setCards(res);
        })
        .catch((err) => console.log(err))

        .finally(() => setLoadingCards(false));

      handleCheckToken();
    }
  }, [navigate, authorization, loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(evt) {
    setSelectedCard(evt.target);
  }
  function handleBtnClick() {
    setIsBtnLoading(true);
  }
  function handleInfoTooltip() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  function handleTrashClick(card) {
    setIsDeleteAlertOpen(true);
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteAlertOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpen(false);
    setIsNavburgerOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (!isLiked) {
      api
        .put(urlPaths.cards, `${card._id}/likes`, authorization)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .delete(urlPaths.cards, `${card._id}/likes`, authorization)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleCardDelete() {
    api
      .delete(urlPaths.cards, cardToDelete._id, authorization)
      .then(
        setCards((state) => state.filter((c) => c._id !== cardToDelete._id))
      )
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api
      .patch(urlPaths.user, authorization, { name, about })
      .catch((err) => console.log(err))
      .finally(() => setIsBtnLoading(false));
    setCurrentUser({ ...currentUser, name, about });
    closeAllPopups();
  }

  function handleUpdateAvatar(avatarRef) {
    api
      .patch(urlPaths.changeAvatar, authorization, { link: avatarRef })
      .catch((err) => console.log(err))
      .finally(() => setIsBtnLoading(false));
    setCurrentUser({ ...currentUser, avatar: avatarRef });
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .post(urlPaths.cards, authorization, {
        link: newCard.link,
        name: newCard.name,
      })
      .then((cardData) => setCards([cardData, ...cards]))
      .catch((err) => console.log(err))
      .finally(() => setIsBtnLoading(false));
  }

  function handleLoggin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    setIsRight(false);
  }

  function removeTokenData() {
    setTokenData("");
  }

  async function handleTokenData(tokenData) {
    const res = await auth.checkToken(tokenData);
    setTokenData(await res.email);
  }

  function handlePageButton(text) {
    setPageButton(text);
  }

  function handleIsRight(boo) {
    setIsRight(boo);
  }

  function useMediaQuery(string) {
    const mediaQuery = useMemo(() => window.matchMedia(string), [string]);
    const [match, setMatch] = useState(mediaQuery.matches);

    useEffect(() => {
      const onChange = () => setMatch(mediaQuery.matches);
      mediaQuery.addEventListener("change", onChange);

      return () => mediaQuery.removeEventListener("change", onChange);
    }, [mediaQuery]);
    return match;
  }

  function useMediaQueries() {
    const lg = useMediaQuery("(min-width: 570px)");

    return lg;
  }

  const largeScreen = useMediaQueries();

  function handleNavburgerOpen() {
    setIsNavburgerOpen(!isNavburgerOpen);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        {isNavburgerOpen ? (
          <NavBurger
            tokenData={tokenData}
            logout={handleLogout}
            removeTokenData={removeTokenData}
            loggedIn={loggedIn}
            pageButton={handlePageButton}
            closeNavburger={closeAllPopups}
          >
            <PageButton pageButton={pageButton} />
          </NavBurger>
        ) : (
          <div></div>
        )}
        <Header>
          {loggedIn ? (
            largeScreen ? (
              <Navbar
                tokenData={tokenData}
                logout={handleLogout}
                removeTokenData={removeTokenData}
                loggedIn={loggedIn}
                pageButton={handlePageButton}
              >
                <PageButton pageButton={pageButton} />
              </Navbar>
            ) : (
              <NavBurgerButton navBurgerOpen={handleNavburgerOpen} />
            )
          ) : (
            <Navbar
              tokenData={tokenData}
              logout={handleLogout}
              removeTokenData={removeTokenData}
              loggedIn={loggedIn}
              pageButton={handlePageButton}
            >
              <PageButton pageButton={pageButton} />
            </Navbar>
          )}
        </Header>
        <hr className="hrz-ruler" />
        <Routes>
          <Route
            element={
              <>
                <Login
                  tokenData={handleTokenData}
                  pageButton={handlePageButton}
                  openAlert={handleInfoTooltip}
                  handleLoggin={handleLoggin}
                  isRight={handleIsRight}
                />
                <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  isRight={isRight}
                />
              </>
            }
            path="/signin"
          />
          <Route
            element={
              <>
                <Register
                  pageButton={handlePageButton}
                  openAlert={handleInfoTooltip}
                  isRight={handleIsRight}
                />
                <InfoTooltip
                  isOpen={isInfoTooltipOpen}
                  onClose={closeAllPopups}
                  isRight={isRight}
                />
              </>
            }
            path="/signup"
          />
          <Route element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route
              path="/"
              element={
                <CardContext.Provider value={cards}>
                  <Main
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleTrashClick}
                    isProfileLoading={loadingProfile}
                    isCardsLoading={loadingCards}
                  />
                  <Footer />
                  <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    isLoading={isBtnLoading}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onBtnClick={handleBtnClick}
                  />

                  <AddPlacePopup
                    onClose={closeAllPopups}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                    onBtnClick={handleBtnClick}
                    isOpen={isAddPlacePopupOpen}
                    isLoading={isBtnLoading}
                  />

                  <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    isLoading={isBtnLoading}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onBtnClick={handleBtnClick}
                    {...form.changeAvatar.input}
                  />

                  <DeleteAlert
                    isOpen={isDeleteAlertOpen}
                    onClose={closeAllPopups}
                    onConfirm={handleCardDelete}
                  />

                  {/* Modal to Show Big Image */}
                  <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                </CardContext.Provider>
              }
            />
          </Route>
        </Routes>
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
