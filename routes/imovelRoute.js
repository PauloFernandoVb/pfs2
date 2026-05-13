import express from 'express';
import ImovelController from '../controllers/imovelController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';
import Multer from 'multer';

const router = express.Router();
const upload = Multer();
let ctrl = new ImovelController();
let auth = new AuthMiddleware();
router.get("/disponivel",  (req, res) => {
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Lista todos os imóveis disponíveis para locação"
    ctrl.listar(req, res);
});

router.get("/", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Lista todos os imóveis cadastrados"
    ctrl.listar(req, res);
});
router.get("/:id", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Retorna um imóvel através do id informado"
    ctrl.obter(req, res);
});
router.post("/", auth.validar, upload.array("imagens", 5), (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Cadastra um novo imóvel"
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/imovel"
                    }
                }
            }
        }

    */
    ctrl.cadastrar(req, res);
});
router.put("/", auth.validar, upload.array("imagens", 5), (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Altera um imóvel existente"
    /* #swagger.requestBody = {
            required: true,
            content: {
                "multipart/form-data": {
                    schema: {
                        $ref: "#/components/schemas/imovel"
                    }
                }
            }
        }
    */
    ctrl.alterar(req, res);
})
router.delete("/:id", auth.validar, (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Exclui um imóvel existente através do id informado"
    ctrl.deletar(req, res);
});
router.get("/imagens/:id",  (req, res) => {
    /* #swagger.security = [{
            "jwt": []
    }] */
    // #swagger.tags = ['Imóvel']
    // #swagger.summary = "Lista as imagens de um determinado imóvel"
    ctrl.imagens(req, res);
});

export default router;
