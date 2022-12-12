class ApiAuth {

    constructor({baseUrl}) {
        this._baseUrl = baseUrl;  
    }

    _getResponseData(res) {
        if (!res.ok) {
            if(res.status === 400) {throw new Error('Не передано одно из полей')}
            if(res.status === 401) {throw new Error(`пользователь с таким email не найден`)}
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    } 

    register (password, email) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'password': password, 'email': email })
        })
        .then(this._getResponseData)
    }

    login (password, email) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({'password': password, 'email': email })
        })
        .then(this._getResponseData)
    }

    exit() {
        return fetch(`${this._baseUrl}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(this._getResponseData)
    }

}

const apiAuth = new ApiAuth({
    baseUrl: 'https://api.mesto.russia.nomoredomains.club'
})

export default apiAuth;