export default class FilterData{
    /**
     * 
     * @param {PokemonId[]} elem 
     * @param {string} key 
     * @returns array
     */
    static filterByName(elem ,key){
        let final = [];
        for (let i = 0; i < elem.length; i++) {
            if(elem[i].name.indexOf(key) !== -1) {
                if (elem[i].name[0] === key[0]) {
                    final.push(elem[i])
                    continue;
                }
            }else{
                continue;
            }
        }
        if (final.length === 0) {
            throw new Error('No se encontro Pokemon')
        }
        return final;
    }
    /**
     * 
     * @param {PokemonId[]} array 
     * @param {string} type 
     * @returns array
     */
    static filterByType(array, type){
        let final = []
        if (!type == '') {
            final = array.filter((fil) => fil.types.some((some) => some === type))
        }
        if (final.length === 0) {
            throw new Error('Ups no existen pokemon de ese tipo en esta region.');
        }
        return final;
    }
    /**
     * 
     * @param {PokemonId[]} elem 
     * @param {number} id 
     * @returns array
     */
    static filterById(elem, id){
        let final = [];
        id = id.toString()
        for (let i = 0; i < elem.length; i++) {
            const s = elem[i].id.toString()
            if(s.indexOf(id.toString()) !== -1) {
                if (s[0] === id[0]) {
                    final.push(elem[i])
                    continue;
                }
            }else{
                continue;
            }
        }
        if (final.length === 0) {
            throw new Error('No se encontro Pokemon')
        }
        return final;
    }
}