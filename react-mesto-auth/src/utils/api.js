class Api {

    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;       
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    } 

    getInitialUserInfo () {
       return  fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers
        })
        .then(this._getResponseData)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            credentials: 'include',
            headers: this._headers
        })
        .then(this._getResponseData)  
    }

    editUserInfo(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(this._getResponseData)
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(this._getResponseData)  
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        })   
        .then(this._getResponseData)
    }

    toggleLike(cardId, method) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: method?'PUT':'DELETE',
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._getResponseData)
    }

    setAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._getResponseData)
    }
}

const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    }
})

export default api;