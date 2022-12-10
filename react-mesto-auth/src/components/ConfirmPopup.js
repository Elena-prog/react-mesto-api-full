import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({ isOpen, onClose, onConfirm }) {
    
    function handleSubmit(e) {
        e.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm
            name="confirm"
            title="Вы уверены?"
            submit="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    )
}

