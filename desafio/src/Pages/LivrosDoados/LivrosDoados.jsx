import S from './doados.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function LivrosDoados() {
    const [livros, setLivros] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');

    // URL da sua API
    const API_URL = 'https://desafio-2-api-livros-vai-na-web-53p7.onrender.com/items';

    // Função para buscar livros da API
    const getLivros = async () => {
        try {
            const response = await axios.get(API_URL);
            setLivros(response.data); // Ajuste conforme a estrutura da resposta
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    };

    // Função para adicionar um livro
    const addLivro = async (livroData) => {
        try {
            const response = await axios.post(API_URL, livroData);
            console.log('Livro adicionado:', response.data);
            getLivros(); // Atualiza a lista de livros
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
        // Limpa os campos do formulário
        setTitulo('');
        setAutor('');
        setCategoria('');
        setImagemUrl('');
    };

    // useEffect para buscar livros ao montar o componente
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
                {livros.length > 0 ? (
                    livros.map((item) => (
                        <article key={item.id}>
                            <img src={item.imagem_url} alt={item.titulo} />
                            <h3>{item.titulo}</h3>
                            <p>{item.autor}</p>
                            <p>{item.categoria}</p>
                        </article>
                    ))
                ) : (
                    <p>Nenhum livro encontrado.</p>
                )}
            </section>
        </section>
    );
}
