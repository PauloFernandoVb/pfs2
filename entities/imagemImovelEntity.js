
import Entity from "./entity.js";
import ImovelEntity from "./imovelEntity.js";


export default class ImagemImovelEntity extends Entity {

    #id;
    #imovel;
    #imagem;
    #extensao;

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
        this.#imovel = value;
    }
    get imagem() {
        return this.#imagem;
    }
    set imagem(value) {
        this.#imagem = value;
    }

    get extensao() {
        return this.#extensao;
    }
    set extensao(value) {
        this.#extensao = value;
    }

    constructor(id, imovel, imagem, extensao) {
        super();
        this.#id = id;
        this.#imovel = imovel;
        this.#imagem = imagem;
        this.#extensao = extensao;
    }

    validar() {
        if(this.#extensao == "png" || 
            this.#extensao == "jpg" || 
            this.#extensao == "jpeg") {
            return true;
        }

        return false;
    }

    static toMap(row) {
        return new ImagemImovelEntity(row["imi_id"], new ImovelEntity(row["imv_id"]), "data:image/jpeg;base64," + row["imi_imagem"].toString("base64"))
    }
}