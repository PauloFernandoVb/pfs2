
import ImagemImovelEntity from "../entities/imagemImovelEntity.js";
import ImovelEntity from "../entities/imovelEntity.js";
import ImagemImovelRepository from "../repositories/imagemImovelRepository.js";
import ImovelRepository from "../repositories/imovelRepository.js";


export default class ImovelController {

    #repoImovel;
    #repoImagens;

    constructor() {
        this.#repoImovel = new ImovelRepository();
        this.#repoImagens = new ImagemImovelRepository()
    }

    async listar(req, res) {
        try{
            var lista = await this.#repoImovel.listar();
            if(lista.length == 0)
                return res.status(404).json({msg: "Nenhum imóvel encontrado"});

            return res.status(200).json(lista);
        }
        catch(error) {
            console.error(error);
            return res.status(500).json({msg: "Erro ao processar requisição"});
        }

    }

    async listarDisponivel(req, res) {
        var lista = await this.#repoImovel.listarDisponivel();
        if(lista.length == 0)
            return res.status(404).json({msg: "Nenhum imóvel encontrado"});

        return res.status(200).json(lista);
    }

    async imagens(req, res) {
        let {id} = req.params;
        let lista = await this.#repoImagens.listarPorImovel(id);
        if(lista.length > 0) {
            return res.status(200).json(lista);
        }
        else {
            return res.status(404).json({msg: "Nenhuma imagem encontrada!"});
        }
    }

    async obter(req, res) {
        const {id} = req.params;

        var lista = await this.#repoImovel.obter(id);
        if(lista.length == 0)
            return res.status(404).json({msg: "Imóvel não encontrado"});

        return res.status(200).json(lista);
    }

    async cadastrar(req, res) {
        const {descricao, cep, endereco, bairro, cidade, valor, disponivel} = req.body;
    
        let imovel = new ImovelEntity(0, descricao, endereco, cep, bairro, cidade, valor, disponivel == "true");
        
        if(imovel.validar()) {
            if(await this.#repoImovel.cadastrar(imovel)) {

                let imagens = [];
                if(req.files.length > 0) {
                    for(let imagem of req.files) {
                        let imagemEntity = new ImagemImovelEntity();
                        imagemEntity.imagem = imagem.buffer;
                        imagemEntity.imovel = imovel;
                        imagemEntity.extensao = imagem.mimetype.split("/").pop();
                        if(imagemEntity.validar()) {
                            imagens.push(imagemEntity);
                        }
                        else
                            throw new Error("Imagem não está no formato válido (Permitido apenas JPG, JPEG E PNG)");
                    }

                    //inicia persistência das imagens
                    for(let img of imagens) {
                        if(await this.#repoImagens.gravar(img) == false)
                            throw new Error("Erro ao gravar as imagens do banco de dados!");
                    }
                }


                res.status(200).json({msg: "Imovel cadastrado com sucesso!"});
            }
            else
                throw new Error("Erro ao inserir imóvel no banco de dados");
        }
        else {
            return res.status(400).json(
                {msg: "Os dados do imóvel não foram preenchidos corretamente"}
            );
        }
    }

    async alterar(req, res) {
        const {id, descricao, cep, endereco, bairro, cidade, valor, disponivel} = req.body;
        let imovel = new ImovelEntity(id, descricao, endereco, cep, bairro, cidade, valor, disponivel == "true");
        if(imovel.validar()) {

            if((await this.#repoImovel.obter(id)).length > 0) {

                let imagens = [];
                if(req.files.length > 0) {
                    for(let imagem of req.files) {
                        let imagemEntity = new ImagemImovelEntity();
                        imagemEntity.imovel = imovel;
                        imagemEntity.extensao = imagem.mimetype.split("/").pop();
                        imagemEntity.imagem = imagem.buffer;
                        if(imagemEntity.validar()){
                            imagens.push(imagemEntity);
                        }
                        else
                            throw new Error("A imagem não possui um formato válido!");
                    }
                }

                if(await this.#repoImovel.alterar(imovel)) {
                    //deleta as imagens antigas
                    await this.#repoImagens.deletarPorImovel(imovel.id);
                    //insere as novas imagens que vieram na requisição
                    for(let img of imagens) {
                        if(await this.#repoImagens.gravar(img) == false)
                            throw new Error("Erro ao atualizar as imagens");
                    }
                    res.status(200).json({msg: "Imovel alterado com sucesso!"});
                }
                else
                    throw new Error("Erro ao alterar imóvel no banco de dados");
            }
            else{
                res.status(404).json({msg: "Imóvel não existe"});
            }
        }
        else {
            return res.status(400).json(
                {msg: "Os dados do imóvel não foram preenchidos corretamente"}
            );
        }
    }

    async deletar(req, res) {
        const {id} = req.params;
        let imovel = await this.#repoImovel.obter(id);
        if(imovel.length > 0) {
            if(await this.#repoImovel.deletar(id)){
                res.status(200).json({msg: "Imóvel excluído com sucesso!"});
            }
            else 
                throw new Error("Erro ao excluir imóvel do banco de dados");
            
        }
        else {
            res.status(404).json({msg: "Imóvel não encontrado para deleção"});
        }
    }


}