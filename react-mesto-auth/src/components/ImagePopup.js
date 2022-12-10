import React from 'react';

export default function ImagePopup({card, onClose}) {

    if(!card){
        return null;
    }

    return (
        <div className ={`popup popup_overlay_dark popup_type_img ${card && 'popup_opened'}`}>
            <div className="popup__image-container">
                <button type="button" className="popup__close-button popup__close-button_type_img" aria-label="кнопка закрыть." onClick={onClose}></button>
                <img src={card.link} alt={card.name} className="popup__image"/>
                <p className="popup__subtitle">{card.name}</p>
            </div>
        </div>
    )
}