import Database from "../db/database.js";
import PerfilEntity from "../entities/perfilEntity.js";
import UsuarioEntity from "../entities/usuarioEntity.js";
import Repository from "./repository.js";


export default class UsuarioRepository extends Repository {


    constructor() {
        super();
    }

    async listar() {
        let sql = `select * from tb_usuario u
        inner join tb_perfil p on u.per_id = p.per_id`;
        
        let rows = await this.banco.ExecutaComando(sql);
        //mapear para lista de entidades
        let entidades = [];

        for(let row of rows) {
            entidades.push(UsuarioEntity.toMap(row));
        }

        return entidades;

    }

    async gravar(entidade) {
        let sql = "insert into tb_usuario (usu_nome,usu_email, usu_ativo, usu_senha, per_id) values (?, ?, ?, ?, ?)";
        let valores = [entidade.nome, entidade.email, entidade.ativo, entidade.senha, entidade.perfil.id];

        let result = await this.banco.ExecutaComandoLastInserted(sql, valores);

        //atribui o id que foi gerado para a entidade
        entidade.id = result;

        return true;
    }

    async excluir(id) {
        let sql = "delete from tb_usuario where usu_id = ?";

        let valores = [id];

        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async atualizar(entidadeAtualizada) {
        let sql = "update tb_usuario set usu_nome = ?, usu_email = ?, usu_ativo = ?, usu_senha = ?, per_id = ? where usu_id = ?";

        let valores = [entidadeAtualizada.nome, entidadeAtualizada.email, entidadeAtualizada.ativo, entidadeAtualizada.senha, entidadeAtualizada.perfil.id,
        entidadeAtualizada.id
        ]

        let result = await this.banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async obter(id) {
        let sql = "select * from tb_usuario where usu_id = ?";

        let valores = [id];

        let rows = await this.banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            return UsuarioEntity.toMap(rows[0]);
        }

        return null;
    }

    async validarAcesso(email, senha) {
        let sql = "select * from tb_usuario where usu_email = ? and usu_senha = ?";

        let valores = [email, senha];

        let rows = await this.banco.ExecutaComando(sql, valores);

        if(rows.length > 0) {
            return UsuarioEntity.toMap(rows[0]);
        }

        return null;
    }
}