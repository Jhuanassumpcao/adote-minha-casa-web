import api from './api.js';

async function signIn (data) {
    api.post('/recipients', data)
}

export default signIn;