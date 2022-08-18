class Pokemon{
    constructor(name, type, id, abilities, stats, sprite){
        this.name = name;
        this.type = type;
        this.id = id;
        this.abilities = abilities;
        this.stats = stats;
        this.sprite = sprite;
    }
    get getCardData(){
        return ([this.name, this.id, this.type, this.sprite])
    }
}

export {Pokemon};