import api from "./api.js";

async function addHouse (data) {
    const response = await api.post('/houses', data);
    return response.data;
}

export default addHouse;