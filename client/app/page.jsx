'use client'
import Image from "next/image";
import styles from "./page.module.css";
import Aviso from "./components/aviso";

export default function Home() {

  //LÓGICA DE INTERFACE PARA LIDAR COM AÇÕES DO USUÁRIO
  function alerta() {
    alert("FUI CLICADO");
  }

 //APRESENTAÇÃO DO COMPONENTE;
  return (
    <div>
      <div>
        <h1>NOVA APLICAÇÃO FRONT-END</h1>

        <button onClick={alerta}>CLIQUE AQUI</button>
      </div>
      <div>
        <h1>TESTE</h1>
      </div>
      <Aviso msg="Bem-vindo!" cor="blue"></Aviso>
    </div>
  );
}
