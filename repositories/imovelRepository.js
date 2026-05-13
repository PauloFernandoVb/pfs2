
import ImovelEntity from "../entities/imovelEntity.js";
import Repository from "./repository.js";


export default class ImovelRepository extends Repository {

    constructor() {
        super();
    }

    async listar() {

        let sql = "select * from tb_imovel";

        let rows = await this.banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(ImovelEntity.toMap(row));
        }

        return lista;

    }

    async listarDisponivel() {

        let sql = "select * from tb_imovel where imv_disponivel = 'S'";

        let rows = await this.banco.ExecutaComando(sql);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(ImovelEntity.toMap(row));
        }

        return lista;

    }

    async obter(id) {

        let sql = "select * from tb_imovel where imv_id = ?";
        let valores = [id];

        let rows = await this.banco.ExecutaComando(sql, valores);
        let lista = [];
        for(let i = 0; i < rows.length; i++) {
            let row = rows[i];
            lista.push(ImovelEntity.toMap(row));
        }

        return lista;

    }

    async cadastrar(entidade) {

        let sql = `insert into tb_imovel (imv_descricao, imv_endereco, 
        imv_cep, imv_bairro, imv_cidade, imv_valor, imv_disponivel)
        values (?, ?, ?, ?, ?, ?, ?)`;
        let valores = [entidade.descricao, entidade.endereco, entidade.cep,
            entidade.bairro, entidade.cidade, entidade.valor, entidade.disponivel
        ];
        
        let idImovel = await this.banco.ExecutaComandoLastInserted(sql, valores);
        
        if(idImovel > 0) {
            entidade.id = idImovel;
            return true;
        }
        

        return false;
    }

    async alterar(entidade) {

        let sql = `update tb_imovel set imv_descricao = ?, 
                                        imv_endereco = ?, 
                                        imv_cep = ?, 
                                        imv_bairro = ?,
                                        imv_cidade = ?,
                                        imv_valor = ?, 
                                        imv_disponivel = ?
                    where imv_id = ?`;
        let valores = [entidade.descricao, entidade.endereco, entidade.cep,
            entidade.bairro, entidade.cidade, entidade.valor, 
            entidade.disponivel, entidade.id];
        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async deletar(id) {

        let sql = "delete from tb_imovel where imv_id = ?";
        let valores = [id];

        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async marcarComoIndisponivel(id) {
        let sql = "update tb_imovel set imv_disponivel = 'N' where imv_id = ?";
        let params = [id];

        return await this.banco.ExecutaComandoNonQuery(sql, params);
    }

}