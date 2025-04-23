const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Para permitir o envio de JSON

// Conexão com o MongoDB
mongoose.connect('sua_url_de_conexao', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Definir um modelo (Schema)
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', ItemSchema);

// Rotas CRUD

// Criar um novo item
app.post('/items', async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
});

// Ler todos os itens
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

// Ler um item específico
app.get('/items/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send('Item não encontrado');
    res.send(item);
});

// Atualizar um item
app.put('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).send('Item não encontrado');
    res.send(item);
});

// Deletar um item
app.delete('/items/:id', async (req, res) => {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send('Item não encontrado');
    res.send('Item deletado');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
