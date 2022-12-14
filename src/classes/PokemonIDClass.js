const allTypes = {
    'bug' : 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/bug_xnoceu.png',
    'dark': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/dark_g8pr1m.png',
    'dragon': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/dragon_dkn0nq.png',
    'electric': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/electric_izhtnf.png',
    'fairy': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/fairy_s0umzi.png',
    'fighting': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/fighting_crpadb.png',
    'fire': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/fire_unxz8o.png',
    'flying': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/flying_gl4xv5.png',
    'ghost': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/ghost_acmbqh.png',
    'grass': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048228/Pokemon-Types/grass_of6ivc.png',
    'ground': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/ground_tbmlgh.png',
    'ice': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/ice_jr3qsp.png',
    'normal': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/normal_o15fbf.png',
    'poison': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/poison_ecusun.png',
    'psychic': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/psychic_cwlpc5.png',
    'rock': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/rock_byynbp.png',
    'steel': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/steel_is6kay.png',
    'water': 'https://res.cloudinary.com/dxagsphno/image/upload/v1671048227/Pokemon-Types/water_vw247n.png',    
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
        <div class="${className} is-color" id="${this.id}">
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