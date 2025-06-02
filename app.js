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
    titulo: String,
    autor: String,
    categoria: String,
    imagem_url: String,
});

const Item = mongoose.model('Item', ItemSchema);

// Rotas CRUD

// Criar item
app.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        const savedItem = await newItem.save();
        res.status(201).json({ message: 'Item criado com sucesso!', data: savedItem });
    } catch (err) {
        console.error('Erro ao criar item:', err);
        res.status(400).json({ error: 'Erro ao criar item', details: err.message });
    }
});

// Listar todos os itens
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ message: 'Itens listados com sucesso!', data: items });
    } catch (err) {
        console.error('Erro ao buscar itens:', err);
        res.status(500).json({ error: 'Erro ao buscar itens', details: err.message });
    }
});

// Obter item por ID
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json({ message: 'Item encontrado!', data: item });
    } catch (err) {
        console.error('Erro ao buscar item:', err);
        res.status(500).json({ error: 'Erro ao buscar item', details: err.message });
    }
});

// Atualizar item
app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json({ message: 'Item atualizado com sucesso!', data: updatedItem });
    } catch (err) {
        console.error('Erro ao atualizar item:', err);
        res.status(400).json({ error: 'Erro ao atualizar item', details: err.message });
    }
});

// Deletar item
app.delete('/items/:id', async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item não encontrado' });
        }
        res.status(200).json({ message: 'Item deletado com sucesso!' });
    } catch (err) {
        console.error('Erro ao deletar item:', err);
        res.status(500).json({ error: 'Erro ao deletar item', details: err.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
