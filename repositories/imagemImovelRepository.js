
import ImagemImovelEntity from "../entities/imagemImovelEntity.js";
import Repository from "./repository.js";


export default class ImagemImovelRepository extends Repository {


    constructor() {
        super();
    }

    async gravar(entidade) {
        let sql = `insert into tb_imagemimovel (imv_id, imi_imagem)
                    values (?, ?)`;
        let valores = [entidade.imovel.id, entidade.imagem];
        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async deletar(id) {
        let sql = "delete from tb_imagemimovel where imi_id = ?";
        let valores = [id];

        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletarPorImovel(idImovel) {
        let sql = "delete from tb_imagemimovel where imv_id = ?";
        let valores = [idImovel];

        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);
        return result;
    }

    async listarPorImovel(idImovel) {
        let sql = "select * from tb_imagemimovel where imv_id = ?";
        let valores = [idImovel];

        let rows = await this.banco.ExecutaComando(sql, valores);
        let lista = [];

        for(let row of rows) {
            lista.push(ImagemImovelEntity.toMap(row));
        }

        return lista;
    }
}