import {url} from './config.js';
const housesUrl = url + "/houses";

export function sendPostHouses(data) {
    fetch(housesUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

export function getHouses() {
    fetch(housesUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}

//atualiza casa? como eu sei que casa eu quero atualizar? eu ganho ID pra casa?
export function putHouse(data) {
    fetch(housesUrl, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
}
