import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__button-delete ${isOwn ? '': 'element__button-delete_hidden'}`
    );
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`heart ${isLiked ? 'heart_active': ''}`);

    function handleCardClick() {    
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="корзина."></button>
            <div className="element__container-image">
                <img src={card.link} alt={card.name} className="element__image" onClick={handleCardClick}/>
            </div>
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__heart">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="кнопка понравилось."></button>
                    <div className="heart__number">{card.likes.length}</div>
                </div>
            </div>
        </li>
    )
}