import { shadowGenerate, renderPokeCard, renderPokeCardHeader, deleteNodes} from "./utils.js";
import { getData } from "./getApi.js";
import { Pokemon } from "./classes.js";

const URLpokemon = 'https://pokeapi.co/api/v2/pokemon/',
URLregion = 'https://pokeapi.co/api/v2/generation/',
URLpokemonregion = 'https://pokeapi.co/api/v2/pokemon-species/';

const luminate = 0.15,
wrapper = document.getElementById('wrapper'),
cardHeader = document.getElementById('cardHeader'),
selectRegion = document.getElementById('region'),
selectType = document.getElementById('type'),
nroPages = 20;
var init = 0,
final = nroPages;

Array.prototype.findString = function(string){
    let final = [];
    for (let i = 0; i < this.length; i++) {
        if(this[i].name.indexOf(string) !== -1) {
            if (this[i].name[0] === string[0]) {
                final.push(this[i])
                continue;
            }
        }else{
            continue;
        }
    }
    return final;
}

function pagesChange(value){
    deleteNodes(wrapper)
    getData(`${URLregion}${value}`)
    .then(json => {
        for (let i = 0; i < json.pokemon_species.length; i++) {
            getData(`${URLpokemon}${json.pokemon_species[i].url.replace(URLpokemonregion, '')}`)
            .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
            .then(poke => wrapper.innerHTML += renderPokeCard(poke.getCardData))
        }
    })
}

function pagesEvery(init, final){
    deleteNodes(wrapper)
    getData(`${URLpokemon}?offset=${init}&limit=${final}`)
    .then(json => {
        for (let i = 0; i < json.results.length; i++) {
            getData(`${URLpokemon}${json.results[i].url.replace(URLpokemon, '')}`)
            .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
            .then(poke => wrapper.innerHTML += renderPokeCard(poke.getCardData))
        }
    })
}

function searchPoke(value){
    deleteNodes(wrapper)
    getData(`${URLpokemon}?offset=0&limit=905`)
        .then(elem => elem.results.findString(value))
        .then(poke => {
            deleteNodes(wrapper);
            for (let i = 0; i < poke.length; i++) {
                getData(`${URLpokemon}${poke[i].url.replace(URLpokemon, '')}`)
                .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
                .then(poke => wrapper.innerHTML += renderPokeCard(poke.getCardData))
            }
        })
}

function pagesPoke(url) {
    deleteNodes(wrapper);
    getData(url)
    .then(elem => {
        for ( init; init < final; init++) {
            elem.results[init]
            console.log(elem.results[init].name);
        }
    })
}

pagesPoke(`${URLpokemon}?offset=0&limit=905`)

window.onload = function(){
    pagesEvery(init, final);
    getData(`${URLpokemon}${Math.floor(Math.random() * 905)}`)
    .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
    .then(elem => cardHeader.innerHTML = renderPokeCardHeader(elem.getCardData))
    document.documentElement.style.setProperty('--ligth-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), luminate));
    document.documentElement.style.setProperty('--dark-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), -luminate));
    document.documentElement.style.setProperty('--blue-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), luminate));
    document.documentElement.style.setProperty('--blue-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), -luminate));
    document.documentElement.style.setProperty('--yellow-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), luminate));
    document.documentElement.style.setProperty('--yellow-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), -luminate));
};

setInterval(()=>{
    getData(`${URLpokemon}${Math.floor(Math.random() * 905)}`)
    .then(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default))
    .then(elem => cardHeader.innerHTML = renderPokeCardHeader(elem.getCardData))
}, 10000)

const next = document.getElementById('next')
    .addEventListener('click', function(){
        if (final < 905) {
            final += nroPages;
            console.log(init, final);
            pagesPoke(`${URLpokemon}?offset=0&limit=905`)
        }
    }),
prev = document.getElementById('prev')
    .addEventListener('click', function(){
        if(final > nroPages){
            init -= nroPages * 2;
            final -= nroPages;
            console.log(init, final);
            pagesPoke(`${URLpokemon}?offset=0&limit=905`)
        }
    })

const search = document.getElementById('search');

search.addEventListener('input', function(){
    if (this.value === '') {
        pagesEvery(0, final)
    }else{
        searchPoke(this.value)
    }
})

selectRegion.addEventListener('change', function(){
    this.value == 0 ? pagesEvery(0, final) : pagesChange(this.value)
})