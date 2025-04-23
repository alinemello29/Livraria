const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite todas as origens
app.use(express.json()); // Permite receber JSON no corpo das requisições

// Rota principal
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Exemplo de rota adicional (livros)
app.get('/livros', (req, res) => {
    res.json([
        { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
        { id: 2, titulo: '1984', autor: 'George Orwell' }
    ]);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
