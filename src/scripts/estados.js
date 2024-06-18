


export async function getStates() {
    return fetch("https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json")
    .then(response => response.json())
    .then(data => {
        const states = data.estados.map(estado => estado.sigla);
        return states;
    })
}

export function getCities(state) {
    return fetch("https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json")
    .then(response => response.json())
    .then(data => {
        const cities = data.estados.filter(estado => estado.sigla === state)[0].cidades;
        return cities;
    })
    .catch(error => console.error('Error:', error));
}