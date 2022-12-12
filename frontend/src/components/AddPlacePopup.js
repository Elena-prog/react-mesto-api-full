import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [values, setValues] = React.useState({name:'', link:''})

    React.useEffect(()=>{
        setValues({
            name:'',
            link:''})
    }, [isOpen])

    function handleChange(e) {
        const {name, value} = e.target;
        setValues((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(values);
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            submit="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
            name="name"
            id="title"
            type="text"
            className="popup__input popup__input_type_title"
            required
            placeholder="Название"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={values.name}
            />
            <span
            id="title-error"
            className="popup__input-error popup__input-error_visible"
            ></span>
            <input
            name="link"
            id="link"
            type="url"
            className="popup__input popup__input_type_link"
            required
            placeholder="Ссылка на картинку"
            onChange={handleChange}
            value={values.link}
            />
            <span
            id="link-error"
            className="popup__input-error popup__input-error_visible"
            ></span>
        </PopupWithForm>
    )
}

