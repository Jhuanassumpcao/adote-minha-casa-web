import api from './api.js';

async function signIn (data) {
    await api.post('/recipients', data)
}

export default signIn;