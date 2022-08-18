import { shadowGenerate, renderPokeCard, deleteNodes, typePoke} from "./utils.js";
import { getDataPoke } from "./getApi.js";
import { Pokemon } from "./classes.js";
const pokemon = new Pokemon();

const luminate = 0.15,
nroPages = 21,
wrapper = document.getElementById('wrapper')
let init = 0;

function pages(init, final){
    deleteNodes(wrapper)
    getDataPoke(`?offset=${init}&limit=${final}`)
    .then(json =>{
        json.results.map(function (elem){
            getDataPoke(elem.url.substr(34))
            .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
            .then(elem => wrapper.innerHTML += renderPokeCard(elem.getCardData))
        })
    })
}

window.onload = function(){
    pages(init, nroPages)
    document.documentElement.style.setProperty('--ligth-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), luminate))
    document.documentElement.style.setProperty('--dark-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), -luminate))
};

const next = document.getElementById('next')
    .addEventListener('click', function(){
        if (init <= 905) {
            init += nroPages;
            pages(init, pages)
        }
    }),

prev = document.getElementById('prev')
    .addEventListener('click', function(){
        if(init >= 0){
            init -= nroPages;
            pages(init, pages)
        }
    })