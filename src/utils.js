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

function renderPokeCardHeader(elem){
    let [name, id, type, sprite] = elem;
    return (`
    <div class="pokeCard isHeader" id="${id}">
    <img src="${sprite === null ? '../public/images/defaultPokeBall.png' : sprite}" class="pokeCard--image">
    <div class="pokeCard--text">
        <h2>${name}</h2>
        <span>NRO°${id}</span>
    </div>
    <div class="pokeCard--types">
        <div class="pokeCard--types--type isHeaderType">
            <img src="${typesPokemon[type[0]]}"  alt="alt">
        </div>
        <div class="pokeCard--types--type isHeaderType">
            <img src="${typesPokemon[type[1]] || typesPokemon["default"]}" alt="alt">
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

export {shadowGenerate ,deleteNodes}