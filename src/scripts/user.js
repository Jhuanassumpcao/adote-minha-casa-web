
export function setUserToken (token) {
    localStorage.setItem('TOKEN_KEY', token);
}

export function getUserToken() {
    return localStorage.getItem('TOKEN_KEY');
}

export function removeUserToken() {
    localStorage.removeItem('TOKEN_KEY');
}

export function isUserLoggedIn() {
    return !!localStorage.getItem('TOKEN_KEY');
}

