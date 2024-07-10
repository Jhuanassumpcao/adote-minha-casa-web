
export function setUserToken (token) {
    localStorage.setItem('TOKEN_KEY', token);
}

export function getUserToken() {
    return localStorage.getItem('TOKEN_KEY');
}

export function removeUserToken() {
    localStorage.removeItem('TOKEN_KEY');
}

export function setUserId(id) {
    localStorage.setItem('USER_ID', id);
}

export function getUserId() {
    return localStorage.getItem('USER_ID');
}

export function removeUserId() {
    localStorage.removeItem('USER_ID');
}

export function isUserLoggedIn() {
    return !!localStorage.getItem('TOKEN_KEY');
}

