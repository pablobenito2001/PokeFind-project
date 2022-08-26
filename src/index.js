import { shadowGenerate, deleteNodes} from "./utils.js";
import { Pokemon, UIwrapper } from "./classes.js";

const urls = [
    'https://pokeapi.co/api/v2/pokemon/',
    'https://pokeapi.co/api/v2/generation/',
]

let urlUse = 0,
region = '';

const luminate = 0.15,
wrapper = document.getElementById('wrapper'),
cardHeader = document.getElementById('cardHeader'),
selectRegion = document.getElementById('region'),
selectType = document.getElementById('type'),
nroPages = 20;
var init = 0,
final = nroPages;

const change = 0;

window.onload = function(){
    document.documentElement.style.setProperty('--ligth-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), luminate));
    document.documentElement.style.setProperty('--dark-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), -luminate));
    document.documentElement.style.setProperty('--blue-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), luminate));
    document.documentElement.style.setProperty('--blue-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), -luminate));
    document.documentElement.style.setProperty('--yellow-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), luminate));
    document.documentElement.style.setProperty('--yellow-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), -luminate));
    UIwrapper.getData(urls[urlUse], '?offset=0&limit=905', wrapper)
};

selectRegion.addEventListener('change', function(){
    deleteNodes(wrapper)    
    if (this.value !== 0) {
        urlUse = 1
        region = this.value;
        UIwrapper.getData(urls[urlUse], this.value, wrapper)
        return;
    }
    region = '?offset=0&limit=905'
    urlUse = 0;
    UIwrapper.getData(urls[urlUse], this.value, wrapper)
})

const searchPokemon = document.getElementById('search') 
    .addEventListener('input', function(){
        deleteNodes(wrapper);
        this.value == '' ? UIwrapper.getData(urls[urlUse], region, wrapper) :  UIwrapper.getData(urls[urlUse], region, wrapper ,this.value.toLowerCase())
    })