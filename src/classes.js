import {getDataPoke} from './getApi.js'
import { deleteNodes } from './utils.js';

class Pokemon{
    constructor(name, type, id, abilities, stats, sprite){
        this.name = name;
        this.type = type;
        this.id = id;
        this.abilities = abilities;
        this.stats = stats;
        this.sprite = sprite;
        this.url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    }
    renderCard(isClass = ''){
        return (`
        <div class="pokeCard is-color ${isClass}" id="${this.id}">
            <img src="${this.sprite === null ? '../public/images/defaultPokeBall.png' : this.sprite}" alt="imagen de pokemon bb" class="pokeCard--image">
            <div class="pokeCard--text">
                <h2>${this.name}</h2>
                <span>NRO°${this.id}</span>
            </div>
            <div class="pokeCard--types">
                ${this.chooseType(this.type)}
            </div>
        </div>`)
    }

    renderInfoPoke(){
        return(`
           <div class="pokeInfo">
                 
           </div> 
        `)
    }

    chooseType(array){
        const typesPokemon = {
            "bug" : '../public/images/pokeTypes/bug.png',
            "dark" : '../public/images/pokeTypes/dark.png',
            "dragon" : '../public/images/pokeTypes/dragon.png',
            "electric" : '../public/images/pokeTypes/electric.png',
            "fairy" : '../public/images/pokeTypes/fairy.png',
            "fighting" : '../public/images/pokeTypes/fighting.png',
            "fire" : '../public/images/pokeTypes/fire.png',
            "flying" : '../public/images/pokeTypes/flying.png',
            "ghost" : '../public/images/pokeTypes/ghost.png',
            "grass" : '../public/images/pokeTypes/grass.png',
            "ground" : '../public/images/pokeTypes/ground.png',
            "ice" : '../public/images/pokeTypes/ice.png',
            "normal" : '../public/images/pokeTypes/normal.png',
            "poison" : '../public/images/pokeTypes/poison.png',
            "psychic" : '../public/images/pokeTypes/psychic.png',
            "rock" : '../public/images/pokeTypes/rock.png',
            "steel" : '../public/images/pokeTypes/steel.png',
            "water" : '../public/images/pokeTypes/water.png',
            "default" : '#'
        }
        let code = "";
        for (let i = 0; i < array.length; i++) {
        code += `
        <div class="pokeCard--types--type">
            <img src="${typesPokemon[array[i]]}" alt="type ${array[i]}" title="${array[i].toUpperCase()} type">
        </div>`
        }
        return code;
    }
}

//Only God knows how works this code//
class UIwrapper{
    constructor(seach , types){
        this.saveArray_ = undefined;
        this.search_ = seach;
        this.type_ = types;
        this.pages_ = 21;
        this.initialPage = 0;
    }
    set search(value){
        this.search_ = value;
    }
    set type(value){
        this.type_ = value;
    }
    set arrayPoke(value){
        this.saveArray_ = value;
    }
    get arrayPoke(){
        return this.saveArray_
    }
    set page(value){
        if (!Number(value)) {
            throw new Error('hubo un problema con la paginacion, llame a su programador de confianza Xd')
        }
        return this.pages_ = Number(value);
    }

    async render(url, to){
        deleteNodes(wrapper)
        const array = await this.getData(url, to, this.search_)
        Promise.all(array)
        .then(res => res.map(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default)).sort((a, b)=> a.id - b.id))
        .then(fil => this.filterByType(fil , this.type_)) 
        .then(elem => {
            this.arrayPoke = elem;
            console.log(this.arrayPoke);
            return this.pagination(elem)
        })
        .then(poke => this.loopRender(poke))
        .catch(e => wrapper.innerHTML = this.showError(e))  
    }

    pagination(array){
        let resul;
        if (!Array.isArray(array)) {
            throw new Error('pagination parameter is not an array, sorry bro.')
        }
        if (array.length < this.pages_) {
            buttons.classList.add('is-hidden');
            return array;
        }
        if (this.initialPage <= 0) {
            prev.removeEventListener('click', ()=>{})
        }
        if (this.initialPage < array.length) {
            next.removeEventListener('click', ()=>{})
        }
        buttons.classList.remove('is-hidden')
        return array.slice(0, 21);
    }

    getData(url = 'https://pokeapi.co/api/v2/pokemon/', to = '?offset=0&limit=905', key){
        if (url == 'https://pokeapi.co/api/v2/pokemon/') {
            var resul = 'results',
            del = 'https://pokeapi.co/api/v2/pokemon/';
        }else if(url == 'https://pokeapi.co/api/v2/generation/'){
            var resul = 'pokemon_species',
            del = 'https://pokeapi.co/api/v2/pokemon-species/';
        }

        return (getDataPoke(url + to)
        .then(search => this.searchPokemon(search[resul] , key))
        .then(elem => {
            this.arrayPoke = elem;
            return elem.map(elem => getDataPoke('https://pokeapi.co/api/v2/pokemon/' + elem.url.replace(del, '')))
        })
        .catch(e => wrapper.innerHTML = this.showError(e))
        )
    }

    loopRender(array){
        if (!Array.isArray(array)) {
            throw new Error('loopRender parameter is not an array')
        }
        for (let i = 0; i < array.length; i++) {
            wrapper.innerHTML += array[i].renderCard()
        }
    }

    filterByType(elem ,type){
        let final = []
        if (!Array.isArray(elem)){
            throw new Error('The filter parameter is not an array')
        }
        if (!type == '') {
            final = elem.filter((fil) => fil.type.some((some) => some === type))
            return final;
        }
        return elem;
    }

    searchPokemon(elem, key){
        let final = [];
        if (key == '') {
            return elem;   
        }
        for (let i = 0; i < elem.length; i++) {
            if(elem[i].name.indexOf(key) !== -1) {
                if (elem[i].name[0] === key[0]) {
                    final.push(elem[i])
                    continue;
                }
            }else{
                continue;
            }
        }
        return final;
    }

    showError(error){
        console.error(error);
        console.error(error.status);
        return(
            `<div class="message">
                <img src="${'../public/images/catchImage.png'}" alt="something went wrong" class="message--image">
                <h2 class="message--title">Lo lamento, ${error.message}</h2>
            </div>`
        )
    }
}

export {UIwrapper};