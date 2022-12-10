import React, {useEffect} from 'react';
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const linkRef = React.useRef(null);

    useEffect(()=>{
        linkRef.current.value = '';
    },[isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({avatar: linkRef.current.value});  
    }

    return (
        <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        submit="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
    >
        <input
        name="link"
        id="avatar"
        type="url"
        className="popup__input popup__input_type_link"
        required
        placeholder="Ссылка на картинку"
        ref={linkRef}
        />
        <span
        id="avatar-error"
        className="popup__input-error popup__input-error_visible"
        ></span>
    </PopupWithForm>
    )
}

