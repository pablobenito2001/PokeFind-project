import FilterData from "./FiltersClass.js";
import { deleteNodes } from "../utils.js";

export default class UIwrapper{
    constructor(data){
        this._data = data;
        this.filterKeys = {
            searchKey: '',
            typeKey: ''
        }
    }
    #NRO_PAGES = 21;
    #INITIAL_PAGE = 0;
    set setDataPoke(value){
        this._data = value;
    }
    /**
     * 
     * @param {PokemonId[]} array 
     */
    renderCards(array){
        const wrapper = document.getElementById('wrapper');
        const buttonsContext = document.getElementById('buttons');
        const prev = document.getElementById('prev');
        const next = document.getElementById('next');
        deleteNodes(wrapper);
        this.#INITIAL_PAGE === 0 ? prev.classList.add('is-disabled') : prev.classList.remove('is-disabled');
        array.length <= this.#NRO_PAGES ? buttonsContext.classList.add('is-hidden') : buttonsContext.classList.remove('is-hidden');
        for (const j of array.slice(this.#INITIAL_PAGE, this.#INITIAL_PAGE + this.#NRO_PAGES)) {
            wrapper.innerHTML += j.renderCard();
        }
    }

    filterChain(){
        try{
            let filter = this._data;
            if (this.filterKeys.typeKey !== '') {
                filter = FilterData.filterByType(filter, this.filterKeys.typeKey);  
            }
            if (this.filterKeys.searchKey !== '') {
                filter = FilterData.filterByName(filter, this.filterKeys.searchKey)
            }
            this.renderCards(filter);
        }catch(e){
            this.showError(e)
        }
    }

    nextPage(){
        this.#INITIAL_PAGE += this.#NRO_PAGES;
        this.filterChain();
    }

    prevPage(){
        this.#INITIAL_PAGE -= this.#NRO_PAGES;
        this.filterChain();
    }

    showError(error){
        const wrapper = document.getElementById('wrapper');
        wrapper.innerHTML = 
        `<div class="message">
            <img src="${'../public/images/catchImage.png'}" alt="something went wrong" class="message--image">
            <h2 class="message--title">${error.message}</h2>
        </div>`;
    }
}