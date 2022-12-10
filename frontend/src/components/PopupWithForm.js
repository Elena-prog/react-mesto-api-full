import React from 'react';

export default function PopupWithForm({name, title, submit, children, isOpen, onClose, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <form action="#" onSubmit={onSubmit} className={`popup__container popup__container_type_${name}`}>
                <button type="button" className={`popup__close-button popup__close-button_type_${name}`} aria-label="кнопка закрыть." onClick={onClose}></button>
                <h3 className="popup__title">{title}</h3>
                {children}
                <button type="submit" className="popup__submit-button">{submit}</button>
            </form>
        </div>
    )
}