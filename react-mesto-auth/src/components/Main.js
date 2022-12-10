import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    if(currentUser){
        return (
            <main className="content">
                <section className="profile">
                    <button onClick={onEditAvatar} className="edit-avatar-button" aria-label="кнопка редактирования аватара.">
                        <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar"/>
                    </button>
    
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button onClick={onEditProfile} className="edit-button" aria-label="кнопка редактирования."></button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                    <button onClick={onAddPlace} className="add-button" aria-label="кнопка добавить."></button>
                </section>
                <section className="elements">
                    <ul className="elements__group">
                        {cards.map(card => {
                            return <Card 
                            key={card._id}
                            card={card} 
                            onCardClick={onCardClick} 
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                            />
                        })}
                    </ul>
                </section>
            </main>
        )
    }
}