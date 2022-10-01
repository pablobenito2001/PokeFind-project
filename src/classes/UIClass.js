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
        deleteNodes(wrapper);
        document.getElementById('buttons').classList.toggle('is-hidden', array.length <= this.#NRO_PAGES)
        document.getElementById('prev').classList.toggle('is-disabled', this.#INITIAL_PAGE === 0)
        document.getElementById('next').classList.toggle('is-disabled', this.#INITIAL_PAGE >= array.length - this.#NRO_PAGES);
        console.log(this.#INITIAL_PAGE);
        console.log(this.#NRO_PAGES);
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

    resetPage(){
        this.#INITIAL_PAGE = 0;
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