'use client'
import Loading from "@/app/components/loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function HomeImovel() {

    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);

    async function carregarImoveis() {
        let response = await fetch("http://localhost:5000/imovel", {
            credentials: "include"
        });
        console.log(response);
        if(response.ok) {
            let corpo = await response.json();
        
            setLista(corpo);
            setLoading(false);
        }
        else {
            let corpo = await response.json();
            setLoading(false);
            toast.error(corpo.msg);
        }

    }

    async function excluir(id) {
        let response = await fetch("http://localhost:5000/imovel/" + id, {
            method: "DELETE",
            credentials: "include"
        });
        let corpo = await response.json();
        if(response.ok) {
            toast.success("Imóvel excluído!");
            carregarImoveis();
        }
        else{
            toast.error(corpo.msg);
        }
    }

    useEffect(() => {
        carregarImoveis();
    }, [])

    return (
        <div>
            
            <h1>Imóveis Cadastrados</h1>
            <div>
                <Link className="btn btn-primary" href="/admin/imovel/cadastrar"><i className="fas fa-plus"></i> Cadastrar Imóvel</Link>
            </div>
            <br></br>
            <div>               
                {
                    loading ?
                    <Loading></Loading>
                    :
                    lista.length > 0 ?
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Descrição</th>
                                    <th>CEP</th>
                                    <th>Endereço</th>
                                    <th>Valor</th>
                                    <th>Disponível</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    lista.map((value, index) => {
                                        return <tr key={index}>
                                                    <td>{value.id}</td>
                                                    <td>{value.descricao}</td>
                                                    <td>{value.cep}</td>
                                                    <td>{value.endereco}</td>
                                                    <td>{value.valor}</td>
                                                    <td>{value.disponivel}</td>
                                    <td>
                                        <Link href={"/admin/imovel/alterar/" + value.id} className="btn btn-primary"><i className="fas fa-pen"></i></Link>
                                        <button onClick={() => excluir(value.id)} className="btn btn-danger"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    :
                    <div><h3>Nenhum imóvel cadastrado!</h3></div>
                }
            </div>
        </div>
        
    )
}