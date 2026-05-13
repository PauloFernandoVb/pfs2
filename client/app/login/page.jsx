'use client'
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react"
import toast from "react-hot-toast";
import UserContext from "../context/userContext";


//olhar o layout do adm na linha 71 onde usamos o nome do usuario para deixar la fixo
//========

//quando o contexto e atualizado perdemos o stato pq usamos o state(null) porem o token ainda esta, mas a nivel de contexto eu fui forçado a renderizar tudo

//======== UserContextpagina para guardar as info do login

//ao inicializar com as cookies vamos manter ela agora no USerContext;
//(vai fazer a chamada para aonde e fazer oq?) resp:
//no contexto usamos o useEffect para guardar pela cookies, porem passa pelo endPoint e devolve a informaçao ao Usuario
//(login controller vamos fazer o endPoint para poder guardar essas informaçoes com a funçao async usuario(req,res){});






export default function LoginPage() {

    const email = useRef("");
    const senha = useRef("");
    const {setUsuario} = useContext(UserContext);

    const router = useRouter();

    async function logar() {
        //faz o fetch para o backend;
        if(email.current.value != "" && senha.current.value != "") {
            let response = await fetch("http://localhost:5000/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email.current.value,
                    senha: senha.current.value
                })
            });
            let corpo = await response.json();
            if(response.ok) {
                //quando a resposta for OK (const {setUsuario} = useContext(UserContext);)
                //a resposta e o token e o usuario ai o usuario
                //autenticação realizada com sucesso
                setUsuario(corpo.usuario);//pega a resposta para usar em todas as paginas 
                router.replace("/admin");
            }
            else {
                toast.error(corpo.msg);
            }
        }
        else {
            toast.error("Preencha o e-mail e a senha!");
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-xl-10 col-lg-12 col-md-9">

                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Faça o login abaixo</h1>
                                            </div>
                                            <form className="user">
                                                <div className="form-group">
                                                    <input ref={email} type="email" className="form-control form-control-user"
                                                        id="exampleInputEmail" aria-describedby="emailHelp"
                                                        placeholder="Insira o e-mail..." />
                                                </div>
                                                <div className="form-group">
                                                    <input ref={senha} type="password" className="form-control form-control-user"
                                                        id="exampleInputPassword" placeholder="Senha" />
                                                </div>
                                                <div className="form-group">
                                                    <div className="custom-control custom-checkbox small">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                        <label className="custom-control-label">Lembrar-me</label>
                                                    </div>
                                                </div>
                                                <button onClick={logar} type="button" className="btn btn-primary btn-user btn-block">
                                                    Login
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                </div>
        </div>
    )
}