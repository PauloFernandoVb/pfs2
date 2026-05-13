import express from 'express';
import usuarioRouter from './routes/usuarioRouter.js'
import loginRouter from './routes/loginRouter.js'
import imovelRouter from './routes/imovelRoute.js';
import locacaoRouter from './routes/locacaoRoute.js';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const outputJson = require("./outputSwagger.json");

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000'], // endereço do frontend da nossa documentação (temporariamente ele está sendo o nosso cliente)
  credentials: true                // cookies com http only serão enviadados automaticamente apenas se essa flag estiver true
}));
server.use("/docs", swaggerUi.serve, swaggerUi.setup(outputJson, {
    swaggerOptions: {
        withCredentials: true //para permitir o envio de cookies da nossa rota /docs
    }
}))

server.use("/usuario", usuarioRouter);
server.use("/login", loginRouter);
server.use("/imovel", imovelRouter);
server.use("/locacao", locacaoRouter);

server.listen(5000, () => {
    console.log("servidor web funcionando!");
})