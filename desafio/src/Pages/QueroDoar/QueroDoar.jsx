import S from './doados.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Doados() {
    // Estado para armazenar os livros recebidos da API
    const [livros, setLivros] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');

    // Função assíncrona para buscar os livros na API
    const getLivros = async () => {
        try {
            const response = await axios.post("https://livraria-1.onrender.com/livros", livroData);
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    };

    // Função para adicionar um novo livro
    const addLivro = async (livroData) => {
        try {
            const response = await axios.post("https://livraria-1.onrender.com/livros", livroData);
            console.log('Livro adicionado:', response.data);
            // Atualiza a lista de livros após adicionar
            getLivros();
        } catch (error) {
            console.error("Erro ao adicionar livro:", error);
        }
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();
        const livroData = {
            titulo,
            autor,
            categoria,
            imagem_url: imagemUrl,
        };
        addLivro(livroData);
        // Limpar os campos do formulário
        setTitulo('');
        setAutor('');
        setCategoria('');
        setImagemUrl('');
    };

    // useEffect para chamar a função de busca ao montar o componente
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
                {/* Renderização dos livros recebidos da API */}
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
