import S from './queroDoar.module.scss'
import livro from '../../assets/Vector.png'

import axios from 'axios'
import {useState} from 'react'

export default function QueroDoar(){


    const [titulo, setTitulo] = useState("")
    const [categoria, setCategoria] = useState("")
    const [autor, setAutor] = useState("")
    const [imagem_url, setImagem] = useState("")


    const enviarDados = async() =>{
 
        const urlApi = "https://api-livros-t2.onrender.com/doar"

        const dadosEnviar = {
            titulo,
            categoria,
            autor,
            imagem_url,
        }


        await axios.post(urlApi,dadosEnviar)

        alert("Livro Enviado!")

        setTitulo("")
        setCategoria("")
        setAutor("")
        setImagem("")

    }




    const capturaTitulo = (e) =>{
        setTitulo(e.target.value)
        console.log(e.target.value)
    }

    const capturaCategoria = (e) =>{
        setCategoria(e.target.value)
    }

    const capturaAutor = (e) =>{
        setAutor(e.target.value)
    }

    const capturaImagem = (e) => {
        setImagem(e.target.value)
    }



    return(
        <section className={S.principal}>
            <section className={S.container}>
                <h2>Por favor, preencha o formulário com suas informações e as informações do Livro</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <img src={livro} alt="" />
                        <h3>Informações do Livro</h3>
                    </div>
                    <input type="text" placeholder='Titulo' onChange={capturaTitulo} value={titulo} />
                    <input type="text" placeholder='Categoria' onChange={capturaCategoria} value={categoria} />
                    <input type="text" placeholder='Autor' onChange={capturaAutor} value={autor} />
                    <input type="text" placeholder='Link da Imagem' onChange={capturaImagem} value={imagem_url} />
                    <input className={S.doar} onClick={enviarDados} type="submit" value="Doar" />
                </form>
            </section>
        </section>
    )
}
