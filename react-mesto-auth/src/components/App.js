import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmPopup from "./ConfirmPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import apiAuth from "../utils/apiAuth";

function App() {
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setisConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [infoRegister, setInfoRegister] = React.useState({
    status: false,
    message: "",
    icon: "",
  });
  const [deletedCard, setDeletedCard] = React.useState(null)
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  React.useEffect(() => {
    if(loggedIn){
      api
      .getInitialUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => alert(err));
    api
      .getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => alert(err));
    }
  }, [loggedIn]);

  function signOut() {
    setLoggedIn(false);
  }

  function onRegister(password, email) {
    return apiAuth
      .register(password, email)
      .then((res) => {
        if (res) {
          setInfoRegister({
            status: true,
            message: "Вы успешно зарегистрировались!",
            icon: "succes",
          });
          history.push("/signin");
        }
      })
      .catch((err) => {
        setInfoRegister({
          status: true,
          message: "Что-то пошло не так! Попробуйте еще раз.",
          icon: "fail",
        });
        console.log(`${err}. Некорректно заполнено одно из полей.`);
      });
  }

  function onLogin(password, email) {
    return apiAuth
      .login(password, email)
      .then(() => {
        setLoggedIn(true);
        setCurrentEmail(email);
        history.push("/");
      })
      .catch((err) => {
        setInfoRegister({
          status: true,
          message: "Что-то пошло не так! Попробуйте еще раз.",
          icon: "fail",
        });
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => alert(`${err}. Не удалось выполнить операцию.`));
  }

  function handleCardDelete() {
    api
      .deleteCard(deletedCard._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => alert(`${err}. Не удалось удалить карточку.`));
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setisEditAvatarPopupOpen(false);
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisConfirmPopupOpen(false);
    setInfoRegister(false);
    setSelectedCard(null);
    setInfoRegister({ status: false, message: "", icon: "" });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api
      .editUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) =>
        alert(`${err}. Не удалось изменить информацию о пользователе.`)
      );
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => alert(`${err}. Не удалось обновить аватар.`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(`${err}. Не удалось создать карточку.`));
  }

  function onConfirmCardDelete (card) {
    setDeletedCard(card);
    setisConfirmPopupOpen(true);
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            loggedIn={loggedIn}
            currentEmail={currentEmail}
            signOut={signOut}
          />
          <Switch>
            <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={onLogin} />
            </Route>
            <ProtectedRoute
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={onConfirmCardDelete}
            />
          </Switch>
          {loggedIn && <Footer />}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ConfirmPopup
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onConfirm={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip onClose={closeAllPopups} infoRegister={infoRegister} />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
