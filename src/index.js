import { shadowGenerate, deleteNodes} from "./utils.js";
import { UIwrapper } from "./classes.js";

const urls = [
    'https://pokeapi.co/api/v2/pokemon/',
    'https://pokeapi.co/api/v2/generation/',
]

const luminate = 0.15,
wrapper = document.getElementById('wrapper'),
cardHeader = document.getElementById('cardHeader'),
selectRegion = document.getElementById('region'),
selectType = document.getElementById('type');

window.onload = function(){
    var urlUse = 0,
    region = '?offset=0&limit=905',
    searchSave = '',
    typeSave = '';
    UIwrapper.getData(urls[0], region, wrapper);

    selectRegion.addEventListener('change', function(){
        deleteNodes(wrapper)    
        if (Number(this.value) !== 0) {
            urlUse = 1;
            region = this.value;
            UIwrapper.getData(urls[urlUse], region, wrapper, searchSave, typeSave)
            return;
        }
        urlUse = 0;
        region = '?offset=0&limit=905';
        UIwrapper.getData(urls[urlUse], region, wrapper, searchSave, typeSave)
    })

    selectType.addEventListener('change', function(){
        deleteNodes(wrapper)
        typeSave = this.value;
        console.log(this.value);
        UIwrapper.getData(urls[urlUse], region, wrapper, searchSave, typeSave)
    })
    
    const searchPokemon = document.getElementById('search') 
        .addEventListener('input', function(){
            deleteNodes(wrapper);
            searchSave = this.value.toLowerCase();
            this.value == '' ? UIwrapper.getData(urls[urlUse], region, wrapper, searchSave, typeSave) :  UIwrapper.getData(urls[urlUse], region, wrapper ,searchSave, typeSave);
        })

        document.documentElement.style.setProperty('--ligth-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), luminate));
        document.documentElement.style.setProperty('--dark-shadow', shadowGenerate(document.documentElement.style.getPropertyValue('--bg-wrapper'), -luminate));
        document.documentElement.style.setProperty('--blue-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), luminate));
        document.documentElement.style.setProperty('--blue-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--blue-color'), -luminate));
        document.documentElement.style.setProperty('--yellow-Lshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), luminate));
        document.documentElement.style.setProperty('--yellow-Dshadow', shadowGenerate(document.documentElement.style.getPropertyValue('--yellow-color'), -luminate));
};


const prev = document.getElementById('prev')
    .addEventListener('click', ()=>{
        UIwrapper.pagination()
    })