

export default class Entity {


    constructor() {

    }

    //to json generico que pode ser herdado por todas as entidades
    toJSON() {
        let props = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        let json = {};
        //popular objeto com as "props"
        for(let prop of props) {
            json[prop] = this[prop]
        }
        return json;
    }
}