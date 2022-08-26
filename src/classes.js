import {getData} from './getApi.js'

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
    renderCard(){
        return (`
        <div class="pokeCard is-color" id="${this.id}}">
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
            <img src="${typesPokemon[array[i]]}" alt="imagen tipo ${typesPokemon[array[i]]}">
        </div>`
        }
        return code;
    }
}

class UIwrapper{
    static getData(url, to, wrapper, searchKey = ''){
        if (url == 'https://pokeapi.co/api/v2/pokemon/') {
            var resul = 'results',
            del = 'https://pokeapi.co/api/v2/pokemon/';
        }else if(url == 'https://pokeapi.co/api/v2/generation/'){
            var resul = 'pokemon_species',
            del = 'https://pokeapi.co/api/v2/pokemon-species/';
        }

        getData(url + to)
        .then(search => this.searchPokemon(search[resul], searchKey))
        .then(elem => elem.map(elem => getData('https://pokeapi.co/api/v2/pokemon/' + elem.url.replace(del, ''))))
        .then(poke => this.render(poke, wrapper))
    }

    static render(array, wrapper){
        Promise.all(array)
        .then(res => res.map(elem => new Pokemon(elem.name, elem.types.map(elem => elem.type.name), elem.id, elem.abilities, elem.stats, elem.sprites.front_default)).sort((a, b)=> a.id - b.id))
        .then(fil => this.filterByType(fil ,''))
        .then(elem => elem.slice(0, 20))
        .then(poke => {
            for (let i = 0; i < poke.length; i++) {
                wrapper.innerHTML += poke[i].renderCard()
            }
        })
        .catch(e => wrapper.innerHTML = this.showError(e))
    }

    static filterByType(elem ,type){
        let final;
        if (!type == '') {
            final = elem.filter((fil) => fil.type.some((some) => some === type))
            return final;
        }
        return elem;
    }

    static searchPokemon(elem, key){
        let final = [];
        if (!key == '') {
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
        return elem;
    }

    static showError(error){
        return(
            `<div class="message">
                <img scr="${'../public/images/catchImage.png'}">
                <h2>Lo lamento, algo salio mal</h2>
                <span>${error}</span>
            </div>`
        )
    }
}

export {Pokemon, UIwrapper};

// elem.filter((elem) => elem.type.some((some) => some === ''))