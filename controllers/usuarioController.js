import PerfilEntity from "../entities/perfilEntity.js";
import UsuarioEntity from "../entities/usuarioEntity.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";


export default class UsuarioController {

    #repo;

    constructor() {
        this.#repo = new UsuarioRepository();
    }

    async listar(req, res) {
        try{
            let entidades = await this.#repo.listar();
            if(entidades.length == 0) {
                return res.status(404).json({msg: "Nenhuma entidade encontrada!"})
            }
            
            return res.status(200).json(entidades);
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }
    }

    async gravar(req, res) {
        try{
            let {nome, email, ativo, senha, perfil} = req.body;
            console.log(nome);
            let entidade = new UsuarioEntity(0, nome, email, ativo, senha, new PerfilEntity(perfil.id));
            if(entidade.validar()) {
                let result = await this.#repo.gravar(entidade);
                
                return res.status(201).json(entidade);
            }
            else {
                return res.status(400).json({msg: "Parâmetros incorretos. Por favor confira as informações do usuário!"});
            }

        }
        catch(error) {
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }
    }

    async deletar(req, res) {
        try{
            let {id} = req.params;
            let usuario = await this.#repo.obter(id);
            if(usuario == null)
                return res.status(404).json({msg: "Usuário não encontrado!"})
        
            let result = await this.#repo.excluir(id);

            if(result == true){
                return res.status(200).json({msg: "Usuário excluído!"});
            }
            else {
                throw new Error("Erro ao excluir o usuário do banco de dados");
            }

         }
        catch(error) {
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }
    }

    async obter(req, res) {
        try{
            let {id} = req.params;

            let usuario = await this.#repo.obter(id);
            if(usuario == null)
                return res.status(404).json({msg: "Usuário não encontrado!"});

            return res.status(200).json(usuario);
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }
    }

    async atualizar(req, res) {
        try{
            let {id, nome, email, ativo, senha, perfil} = req.body;
            let usuario = new UsuarioEntity(id, nome, email, ativo, senha, new PerfilEntity(perfil.id));
            if(usuario.validar() && id) {
                let usuarioEncontrado = await this.#repo.obter(id);
                if(usuarioEncontrado) {
                    let result = await this.#repo.atualizar(usuario);
                    if(result) {
                        return res.status(200).json({msg: "Usuário atualizado com sucesso!"});
                    }

                    throw new Error("Erro ao atualizar usuário no banco de dados");
                }
                else {
                    return res.status(404).json({msg: "Usuário não encontrado!"});
                }
                
            }
            else {
                return res.status(400).json({msg: "Faltam informações para concluir a atualização!"});
            }

        }
        catch {
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }
    }

}