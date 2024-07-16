import api from './api';
import { setUserToken, removeUserToken } from '@/scripts/user.js';

async function login(data) {
    const response = await api.post('/login', data);
    setUserToken(response.data.token);
}

export default login;