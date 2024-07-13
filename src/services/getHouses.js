import api from "./api.js";

async function getHouses (id) {
    const response = await api.get('/houses/' + id);	
    return response.data;
}
export default getHouses;