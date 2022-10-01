const allTypes = {
    'bug' : '../public/images/pokeTypes/bug.png',
    'dark': '../public/images/pokeTypes/dark.png',
    'dragon': '../public/images/pokeTypes/dragon.png',
    'electric': '../public/images/pokeTypes/electric.png',
    'fairy': '../public/images/pokeTypes/fairy.png',
    'fighting': '../public/images/pokeTypes/fighting.png',
    'fire': '../public/images/pokeTypes/fire.png',
    'flying': '../public/images/pokeTypes/flying.png',
    'ghost': '../public/images/pokeTypes/ghost.png',
    'grass': '../public/images/pokeTypes/grass.png',
    'ground': '../public/images/pokeTypes/ground.png',
    'ice': '../public/images/pokeTypes/ice.png',
    'normal': '../public/images/pokeTypes/normal.png',
    'poison': '../public/images/pokeTypes/poison.png',
    'psychic': '../public/images/pokeTypes/psychic.png',
    'rock': '../public/images/pokeTypes/rock.png',
    'steel': '../public/images/pokeTypes/steel.png',
    'water': '../public/images/pokeTypes/water.png',    
}

export default class PokemonId{
    constructor(name, id, types, stats, abilities, sprite){
        this.name = name;
        this.id = id;
        this.types = types;
        this.stats = stats;
        this.abilities = abilities;
        this.sprite = sprite;
    }
    /**
     * 
     * @param {string} className set the pokecard class
     * @returns 
     */
    renderCard(className = 'pokeCard'){
        return(`
        <div class="${className} is-color">
            <img src="${this.sprite || '../public/images/defaultPokeBall.png'}" class="${className}--image" loading="lazy" alt="${this.name}">
            <div class="${className}--text">
                <h2>${this.name}</h2>
                <span id="${this.id}">Nro°${this.id}</span>
            </div>
            <div class="${className}--types">
                ${this.chooseType(this.types, className)}
            </div>
        </div>
        `)
    }
    chooseType(array, className){
        let res = ''
        for (let i = 0; i < array.length; i++) {
            res += 
            `<div class="${className}--types">
                <img src="${allTypes[array[i]]}" alt="pokemon type" title="${array[i]}" class="${className}--types--type">
            </div>`
        }
        return res;
    }
}