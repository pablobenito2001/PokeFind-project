import { shadowGenerate, deleteNodes} from "./utils.js";
import { UIwrapper } from "./classes.js";
const uiwrapper = new UIwrapper([], '', '')
const urls = [
    'https://pokeapi.co/api/v2/pokemon/',
    'https://pokeapi.co/api/v2/generation/',
]

const luminate = 0.15,
wrapper = document.getElementById('wrapper');

document.documentElement.style.setProperty('--ligth-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), luminate));
document.documentElement.style.setProperty('--dark-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), -luminate));
document.documentElement.style.setProperty('--blue-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), luminate));
document.documentElement.style.setProperty('--blue-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), -luminate));
document.documentElement.style.setProperty('--yellow-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), luminate));
document.documentElement.style.setProperty('--yellow-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), -luminate));

window.onload = function(){
    //*Variables de uso//
    var urlUse = 0,
    region = '?offset=0&limit=905';
    //* *//

    uiwrapper.render(urls[urlUse], region)

    const searchPokemon = document.getElementById('search') 
    .addEventListener('input', function(){
        deleteNodes(wrapper);
        uiwrapper.search = this.value.toLowerCase();
        uiwrapper.render(urls[urlUse], region);
    })
    //*Selects//
    const selectRegion = document.getElementById('region')
    .addEventListener('change', function(){
        deleteNodes(wrapper)    
        if (Number(this.value) !== 0) {
            urlUse = 1;
            region = this.value;
            uiwrapper.render(urls[urlUse], region)
            return;
        }
        urlUse = 0; 
        region = '?offset=0&limit=905';
        uiwrapper.render(urls[urlUse], region)
    })
    
    const selectType = document.getElementById('type')
    .addEventListener('change', function(){
        deleteNodes(wrapper)
        uiwrapper.type = this.value;
        uiwrapper.render(urls[urlUse], region)
    })
    //*Botones//
    const next = document.getElementById('next')
    .addEventListener('click', function(){
        deleteNodes(wrapper);
        uiwrapper.render(urls[urlUse], region)
    });
    const prev = document.getElementById('prev')
    .addEventListener('click', function(){
        if (final > nroPages) {
            deleteNodes(wrapper);
            uiwrapper.render(urls[urlUse], region)
        }
    });
}