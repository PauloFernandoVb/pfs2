
import express from 'express';
import LocacaoController from '../controllers/locacaoController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

let ctrl = new LocacaoController();
let auth = new AuthMiddleware();
router.post("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Locação']
    // #swagger.tags = 'Inicia o processo para locar um imóvel'

    /* #swagger.security = [{
            "jwt": []
    }] */

    ctrl.locar(req, res);
})
router.get("/", auth.validar, (req, res) => {

    // #swagger.tags = ['Locação']
    // #swagger.tags = 'Busca todos os contratos de locação de um usuário'

    /* #swagger.security = [{
            "jwt": []
    }] */

    ctrl.listar(req, res);
})

export default router;
