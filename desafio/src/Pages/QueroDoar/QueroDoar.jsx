import S from './doados.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Doados() {
    const [livros, setLivros] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');

    const getLivros = async () => {
    try {
        const response = await axios.get("http://localhost:3000/items");
        setLivros(response.data);
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
    }
};


   const addLivro = async (livroData) => {
    try {
        const response = await axios.post("http://localhost:3000/items", livroData);
        console.log('Livro adicionado:', response.data);
        getLivros();
    } catch (error) {
        console.error("Erro ao adicionar livro:", error);
    }
};



    const handleSubmit = (e) => {
        e.preventDefault();
        const livroData = {
            titulo,
            autor,
            categoria,
            imagem_url: imagemUrl,
        };
        addLivro(livroData);
        setTitulo('');
        setAutor('');
        setCategoria('');
        setImagemUrl('');
    };

    useEffect(() => {
        getLivros();
    }, []);

    return (
        <section className={S.boxDoados}>
            <h2>Livros Doados</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Categoria"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="URL da Imagem"
                    value={imagemUrl}
                    onChange={(e) => setImagemUrl(e.target.value)}
                    required
                />
                <button type="submit">Adicionar Livro</button>
            </form>
            <section className={S.boxBooks}>
                {livros.map((item) => (
                    <article key={item.id}>
                        <img src={item.imagem_url} alt={item.titulo} />
                        <h3>{item.titulo}</h3>
                        <p>{item.autor}</p>
                        <p>{item.categoria}</p>
                    </article>
                ))}
            </section>
        </section>
    );
}
