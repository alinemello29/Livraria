const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb+srv://alinedev550:bSX2f93z1mOWQ3L0@cluster0.t8hply5.mongodb.net/livraria?retryWrites=true&w=majority')
    .then(() => console.log('✅ MongoDB conectado'))
    .catch(err => console.error('❌ Erro ao conectar ao MongoDB:', err));

// Schema e Model
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String
});

const Item = mongoose.model('Item', ItemSchema);

// Rotas CRUD

// Criar item
app.post('/items', async (req, res) => {
    try {
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao criar item', detalhes: err.message });
    }
});

// Listar todos os itens
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar itens' });
    }
});

// Obter item por ID
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).send('Item não encontrado');
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar item' });
    }
});

// Atualizar item
app.put('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) return res.status(404).send('Item não encontrado');
        res.json(item);
    } catch (err) {
        res.status(400).json({ error: 'Erro ao atualizar item' });
    }
});

// Deletar item
app.delete('/items/:id', async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).send('Item não encontrado');
        res.send('Item deletado');
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar item' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
