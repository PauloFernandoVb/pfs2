'use client'
// ver a melhor maneira as de criar as pastas e page do next para a estrutura

// ( segunda aula 21:16
//erros do script do layout
//21:21 validar navegaçao (começo do audio)
//midleware para o frontend- do proprio next (PROXY.JS)
//proxy faz o redirecioamento para a proxima rota


//)

import Loading from "../components/loading";

const { createContext, useState, useEffect } = require("react")
//estrutura para diferenciar as cookies se sera adm ou locatario
//provedor de contexto para trazer as info dos usuarios
const UserContext = createContext();

//contexto para usar em tdas as telas e armazenar as info do back aqui

//essa funçao (caregarUsuario(){}
// // )eu pego pelo corpo do body da documentaçao, usando o loginController/loginRouter
//que pela cookie tras aqui
//o next do login router trouxe aqui

export const UserProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    async function carregarUsuario() {
        let response = await fetch("http://localhost:5000/login/usuario", {
            credentials: 'include'
        })
        let corpo = await response.json();
        if (response.ok) {
            setUsuario(corpo);

        }
        setLoading(false); //muda o estado do login
    }

    useEffect(() => {
        carregarUsuario();
    }, []);

    return (

        <UserContext.Provider value={{ usuario, setUsuario }}>
            {
                loading ?
                    <html>
                        <body>
                            <Loading></Loading>
                        </body>
                    </html>
                    :
                    children
            }
        </UserContext.Provider>
    )
}

export default UserContext;