import PokemonId from './PokemonIDClass.js';

export default class GetData{
    /**
     * 
     * @param {string} poke 
     * @returns Promise
     */
    static async getDataOne(poke){
        try{
            return await fetch(poke).then(response => {
                if (response.headers.get('content-type') != 'application/json; charset=utf-8') {
                    throw new Error(response.headers.get('content-type'));
                }
                return response.json();
            })
            .then(json => json = new PokemonId(json.name, json.id, json.types.map(t => t.type.name), json.stats, json.abilities, json.sprites.front_default))
        }catch(e){
            throw new Error('Hubo un error Lo lamento', e)
        }
    }
    /**
     * 
     * @param {String} url 
     * @returns [Promise..]
     */
    static async getDataAll(url){
        try{
            return Promise.all(await fetch(url)
            .then(response => {
                if (response.headers.get('content-type') != 'application/json; charset=utf-8') {
                    throw new Error(response.headers.get('content-type'));
                }
                return response.json(); 
                })
            .then(elem => elem['pokemon_species'].map(elem => this.getDataOne(elem.url.replace('-species', ''))))
            )
        }catch(e){
            throw new Error('Hubo un error Lo lamento')
        }
    }
}
