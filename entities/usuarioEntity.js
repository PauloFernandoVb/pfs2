import Entity from "./entity.js";
import PerfilEntity from "./perfilEntity.js";


export default class UsuarioEntity extends Entity {

    #id;
    #nome;
    #email;
    #ativo;
    #senha;
    #perfil;

    get id() {
        return this.#id;
    }
    
    set id(value) {
        this.#id = value;
    }

    get nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#nome = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get ativo() {
        return this.#ativo;
    }

    set ativo(value) {
        this.#ativo = value;
    }

    get senha() {
        return this.#senha
    }

    set senha(value) {
        this.#senha = value;
    }

    get perfil() {
        return this.#perfil
    }

    set perfil(value) {
        this.#perfil = value;
    }


    constructor(id, nome, email, ativo, senha, perfil) {
        super();
        this.#id = id;
        this.#nome = nome;
        this.#email = email;
        this.#ativo = ativo;
        this.#senha = senha;
        this.#perfil = perfil;
    }

    static toMap(row) {
        let usuario = new UsuarioEntity(row["usu_id"], row["usu_nome"], row["usu_email"], row["usu_ativo"], row["usu_senha"], new PerfilEntity(row["per_id"]))
        //para junções com a tabela de perfil
        if(row["per_descricao"] != null) {
            usuario.perfil.descricao = row["per_descricao"];
        }
        return usuario;
    }

    validar() {
        if(this.#nome != null && this.#email != null && this.#perfil.id > 0 && this.#email.includes("@")) {
            return true;
        }

        return false;
    }
}
