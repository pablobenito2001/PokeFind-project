import { shadowGenerate, renderPokeCard, renderPokeCardHeader,deleteNodes} from "./utils.js";
import { getDataPoke } from "./getApi.js";
import { Pokemon } from "./classes.js";

const luminate = 0.15,
nroPages = 20,
wrapper = document.getElementById('wrapper'),
cardHeader = document.getElementById('cardHeader')
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
    pages(init, nroPages);
    getDataPoke(Math.floor(Math.random() * 905))
    .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
    .then(elem => cardHeader.innerHTML = renderPokeCardHeader(elem.getCardData))
    document.documentElement.style.setProperty('--ligth-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), luminate));
    document.documentElement.style.setProperty('--dark-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), -luminate));
    document.documentElement.style.setProperty('--blue-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), luminate));
    document.documentElement.style.setProperty('--blue-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), -luminate));
};

setInterval(()=>{
    getDataPoke(Math.floor(Math.random() * 750))
    .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
    .then(elem => cardHeader.innerHTML = renderPokeCardHeader(elem.getCardData))
}, 10000)

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