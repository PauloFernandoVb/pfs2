'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


export default function FormImovel({imovel}) {

    const [alteracao, setAlteracao] = useState(false);
    const router = useRouter();

    const descricao = useRef("");
    const cep = useRef("");
    const bairro = useRef("");
    const endereco = useRef("");
    const cidade  = useRef("");
    const valor = useRef("");
    const disponivel = useRef();
    const fotos = useRef();

    async function consultaCep() {
        if(cep.current.value != "") {
            let response = await fetch("https://viacep.com.br/ws/"+ cep.current.value +"/json/");
            let corpo = await response.json();
            if(response.ok) {
                endereco.current.value = corpo.logradouro;
                cidade.current.value = corpo.localidade;
                bairro.current.value = corpo.bairro;
            }
        }
        
    }

    async function gravar() {
        //valida os campos
        if(descricao.current.value != "" &&
            cep.current.value != "" &&
            bairro.current.value != "" &&
            endereco.current.value != "" &&
            cidade.current.value != "" &&
            valor.current.value != "" &&
            valor.current.value > 0) {

            //cria o form data para enviar ao backend
            let formData = new FormData();
            formData.append("descricao", descricao.current.value);
            formData.append("cep", cep.current.value);
            formData.append("bairro", bairro.current.value);
            formData.append("cidade", cidade.current.value);
            formData.append("endereco", endereco.current.value);
            formData.append("valor", valor.current.value);
            formData.append("disponivel", disponivel.current.checked);

            //fazer o fetch
            let response = await fetch("http://localhost:5000/imovel", {
                method: "POST",
                credentials: "include",
                body: formData
            });
            let corpo = await response.json();
            if(response.ok) {
                toast.success(corpo.msg)
                //navega para a listagem
                router.back();
            }
            else {
                toast.error(corpo.msg);
            }
        }
        else {
            toast.error("Preencha corretamente os campos do formulário");
        }
    }

    async function alterar() {
        //valida os campos
        if(descricao.current.value != "" &&
            cep.current.value != "" &&
            bairro.current.value != "" &&
            endereco.current.value != "" &&
            cidade.current.value != "" &&
            valor.current.value != "" &&
            valor.current.value > 0) {

            //cria o form data para enviar ao backend
            let formData = new FormData();
            formData.append("id", imovel.id);
            formData.append("descricao", descricao.current.value);
            formData.append("cep", cep.current.value);
            formData.append("bairro", bairro.current.value);
            formData.append("cidade", cidade.current.value);
            formData.append("endereco", endereco.current.value);
            formData.append("valor", valor.current.value);
            formData.append("disponivel", disponivel.current.checked);

            //fazer o fetch
            let response = await fetch("http://localhost:5000/imovel", {
                method: "PUT",
                credentials: "include",
                body: formData
            });
            let corpo = await response.json();
            if(response.ok) {
                toast.success(corpo.msg)
                //navega para a listagem
                router.back();
            }
            else {
                toast.error(corpo.msg);
            }
        }
        else {
            toast.error("Preencha corretamente os campos do formulário");
        }
    }

    useEffect(() => {
        //se diferente de null, estamos em alteração
        if(imovel) {
            //troca o estado e preenche os ref's
            descricao.current.value = imovel.descricao;
            cep.current.value = imovel.cep;
            bairro.current.value = imovel.bairro;
            endereco.current.value = imovel.endereco;
            cidade.current.value = imovel.cidade;
            valor.current.value = imovel.valor;
            disponivel.current.checked = imovel.disponivel == 1 ? true : false;
            setAlteracao(true);
        }
    }, [])

    return (
        <div>
            <div className="form-group">
                <label>Descrição</label>
                <input ref={descricao} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>CEP</label>
                <input onBlur={consultaCep} ref={cep} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Endereço</label>
                <input ref={endereco} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Bairro</label>
                <input ref={bairro} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Cidade</label>
                <input ref={cidade} type="text" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Valor</label>
                <input ref={valor} type="decimal" className="form-control"></input>
            </div>
            <div className="form-group">
                <label>Fotos do Imóvel</label>
                <input ref={fotos} className="form-control" type="file" multiple></input>
            </div>
            <div className="form-group">
                <label><input ref={disponivel} type="checkbox"></input> Disponível para locação</label>
            </div> 

            <div>
                <button onClick={alteracao ? alterar : gravar} className="btn btn-primary"><i className="fas fa-check"></i> Confirmar</button>    
                <Link href="/admin/imovel" className="btn btn-default"><i className="fas fa-arrow-left"></i> Voltar</Link>
            </div> 
        </div>
    )
}