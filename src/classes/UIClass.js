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
        wrapper.innerHTML = ''
        for (const j of array.slice(0, 21)) {
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

    showError(error){
        const wrapper = document.getElementById('wrapper');
        wrapper.innerHTML = 
        `<div class="message">
            <img src="${'../public/images/catchImage.png'}" alt="something went wrong" class="message--image">
            <h2 class="message--title">${error.message}</h2>
        </div>`;
    }
}