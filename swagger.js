import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "API PFS2",
        description: "API que está sendo desenvolvida durante a disciplina de Programação Fullstack II"
    },
    host: "localhost:5000",
        components: {
        schemas: {
            
            erro: {
                msg: 'Mensagem de erro'
            },
            usuario: {
                id: 999,
                nome: "Fulano de Tal",
                email: "fulano@unoeste.br",
                senha: "123abc",
                ativo: true,
                perfil: {
                    id: 1
                }
            },
        },
        '@schemas': {
            imovel: {
                type: 'object',
                properties: {
                    id: {
                        type: "integer",
                        example: 999,
                        required: false,
                    },
                    descricao: {
                        type: "string",
                        required: true,
                    },
                    endereco: {
                        type: "string",
                        required: true,
                    },
                    cep: {
                        type: "string",
                        required: true,
                    },
                    bairro: {
                        type: "string",
                        required: true,
                    },
                    cidade: {
                        type: "string",
                        required: true,
                    },
                    valor: {
                        type: "number",
                        required: true,
                    },
                    disponivel: {
                        type: "boolean",
                        required: true,
                    },
                    imagens: {
                        type: "array",
                        items: {
                            type: "string",
                            format: "binary"
                        }
                    }
                }
            }
        },
    },
    securityDefinitions: {
        jwt: {
            type: 'apiKey',
            in: 'cookie', // can be 'header', 'query' or 'cookie'
            name: 'token', // name of the header, query parameter or cookie
            description: 'JWT gerado a partir da autenticação'
        }
  }
}
const saida = "./outputSwagger.json";
const routes = ["./server.js"];

swaggerAutogen({openapi: '3.0.0'})(saida, routes, doc)
.then(async () => {
    await import("./server.js")
})