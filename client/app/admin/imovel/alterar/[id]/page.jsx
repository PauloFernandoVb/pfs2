'use client'
import FormImovel from "@/app/components/formImovel";
import Loading from "@/app/components/loading";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function AlterarImovelPage({ params }) {
    const {id} = use(params);
    const [imovel, setImovel] = useState(null);
    const [loading, setLoading] = useState(true);

    async function carregarImovel() {
        //busca as informações do imóvel via fetch

        let response = await fetch("http://localhost:5000/imovel/" + id, {
            credentials: "include"
        });
        let corpo = await response.json();
        console.log(corpo);
        if(response.ok) {
            setImovel(corpo[0])
        }
        else {
            toast.error(corpo.msg);
        }

        setLoading(false);
    }

    useEffect(() => {
        carregarImovel();
    }, [])

    return (
        <div>
            <h1>Alterar Imóvel</h1>

            {
                loading ? 
                <Loading></Loading>
                :
                imovel ?
                <FormImovel imovel={imovel}></FormImovel>
                :
                <div>Erro ao carregar imóvel!</div>
            }
        </div>
    )
}