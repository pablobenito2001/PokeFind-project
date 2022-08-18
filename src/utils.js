const typesPokemon = {
    "bug" : '../public/images/pokeTypes/bug.png',
    "dark" : '../public/images/pokeTypes/dark.png',
    "dragon" : '../public/images/pokeTypes/dragon.png',
    "electric" : '../public/images/pokeTypes/electric.png',
    "fairy" : '../public/images/pokeTypes/fairy.png',
    "figthing" : '../public/images/pokeTypes/figthing.png',
    "fire" : '../public/images/pokeTypes/fire.png',
    "flying" : '../public/images/pokeTypes/flying.png',
    "ghost" : '../public/images/pokeTypes/ghost.png',
    "grass" : '../public/images/pokeTypes/grass.png',
    "ground" : '../public/images/pokeTypes/ground.png',
    "ice" : '../public/images/pokeTypes/bug.ice',
    "normal" : '../public/images/pokeTypes/normal.png',
    "poison" : '../public/images/pokeTypes/poison.png',
    "psychic" : '../public/images/pokeTypes/psychic.png',
    "rock" : '../public/images/pokeTypes/rock.png',
    "steel" : '../public/images/pokeTypes/steel.png',
    "water" : '../public/images/pokeTypes/water.png',
    "default" : '#'
}


function typePoke(elem){
    console.log(elem);
    return(
        `<div class="pokeCard--type">
            <img src="${typesPokemon[elem.toLowerCase()] || typesPokemon['default']}" alt="${typesPokemon[elem.toLowerCase()]} type">
        </div>`
    )
}

function shadowGenerate(color, lum){
    color = String(color).replace(/[^0-9a-f]/gi, '');
    lum = lum || 0;

    let rgb = '#',
    c;
    for (let i = 0; i < 3; i++) {
        c = parseInt(color.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(c + c * lum, 0), 255)).toString(16); 
        rgb += c;
    }
    if (rgb.length < 6) {
        rgb = "00" + rgb;
    }
    return rgb;
}

function renderPokeCard(elem){
    let [name, id, type, sprite] = elem;
    return (`
    <div class="pokeCard is-color" id="${id}">
    <img src="${sprite}" alt="imagen de pokemon bb" class="pokeCard--image">
    <div class="pokeCard--text">
        <h2>${name}</h2>
        <span>NRO°${id}</span>
    </div>
    <div class="pokeCard--types">
        <div class="pokeCard--types--type">
            <img src="${typesPokemon[type[0]]}">
        </div>
        <div class="pokeCard--types--type">
            <img src="${typesPokemon[type[1]] || typesPokemon["default"]}">
        </div>
    </div>
    </div>`
    )
}

function deleteNodes(father){
    while (father.firstChild) {
        father.removeChild(father.firstChild);
    }
}

export {shadowGenerate, renderPokeCard, deleteNodes, typePoke}