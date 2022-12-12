import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [values, setValues] = React.useState({name:'', about:''});
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        if(currentUser){
            setValues({
                name: currentUser.name,
                about: currentUser.about
            })
        }
    }, [currentUser, isOpen]); 

    function handleChange(e) {
        const {name, value} = e.target;
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values);
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            submit="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            >
            <input
            name="name"
            id="name"
            type="text"
            className="popup__input popup__input_type_name"
            required
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            value={values.name}
            onChange={handleChange}
            />
            <span
            id="name-error"
            className="popup__input-error popup__input-error_visible"
            ></span>
            <input
            name="about"
            id="description"
            type="text"
            className="popup__input popup__input_type_description"
            required
            placeholder="Род деятельности"
            minLength="2"
            maxLength="200"
            value={values.about}
            onChange={handleChange}
            />
            <span
            id="description-error"
            className="popup__input-error popup__input-error_visible"
            ></span>
        </PopupWithForm>
    )
}

