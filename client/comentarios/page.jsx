export default function cometarios() {

    return (

        <div>

        </div>
        // //13/05 2 aula
        // // ver a melhor maneira as de criar as pastas e page do next para a estrutura

        // // ( segunda aula 21:16
        // //erros do script do layout
        // //21:21 validar navegaçao (começo do audio)
        // //midleware para o frontend- do proprio next (PROXY.JS)
        // //proxy faz o redirecioamento para a proxima rota

        // //criamos o proxy na raiz na pasta client
        // export const config = {
        //     matcher: ['/admin/:path'] //aray de rotas/ do admin e do locatario
        // }
        //     //:path* quer dizer qualquer coisa. que vir depois da rota /admin ou / locatario

        //     //na funçao proxy fazemos a nest reponse que redireciona 
        //     < html >
        //     <p>no primeiro audio ele falou do erro do import

        //         no segundo audio fomos ate a criaçao do proxy e fizemos isso:

        //         (
        //         import {NextResponse} from "next/server"

        //         export function proxy(request) {
        //                return NextResponse.redirect(new URL('/login', request.url));
        //            }

        //         export const config = {
        //             matcher: ['/admin/:path*'] //aray de rotas/ do admin e do locatario
        //            }
        //         )

        //     </p>
        // </html >
        // //)

        //===================
        //3 audio 21:35 (por ai)
        //o proxy manda pro admin e o audmin voltava para o login ai usamos o if(!request.cookies.get) e o nome da cookie se vier a cookie exist se nao nao exit
    )


    //=============================
    //4 audio 
    //organizando os fetchs
    //criaremos uma classe para fazer as chamadas do fetch base

    //exemplo de como fazer a chamada: da ApiClient
    async function carregarImoveis() {
        let corpo = await ApiClient.get("imovel");
        if (corpo.ok) {
            let corpo = await response.json();

        }
    }
}
