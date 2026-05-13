
import Entity from "./entity.js";


export default class ContratoEntity extends Entity {

    #id;
    #imovel;
    #usuario;
    #alugueis;

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get imovel() {
        return this.#imovel;
    }

    set imovel(value) {
        this.#imovel= value;
    }

    get usuario() {
        return this.#usuario;
    }

    set usuario(value) {
        this.#usuario = value;
    }

    get alugueis() {
        return this.#alugueis;
    }

    set alugueis(value) {
        this.#alugueis = value;
    }

    constructor(id, imovel, usuario, alugueis) {
        super();
        this.#id = id;
        this.#imovel = imovel;
        this.#usuario = usuario;
        this.#alugueis = alugueis;
    }
}