'use client'

export default function Aviso({msg, cor}) {

    return (
        <div style={{background: cor, padding: "10px", borderRadius: "5px"}}>
            <h1>{msg}</h1>
        </div>
    )
}