const axios = require('axios');
const historiaModel = require('../models/historiaModel');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const createHistoria = (req, res) => {
    const { titulo, descricao, categoria } = req.body;

    if (!titulo || !descricao || !categoria) {
        return res.status(400).json({ error: "Campos obrigatórios: titulo, descricao, categoria" });
    }

    historiaModel.createHistoria(titulo, descricao, categoria, (err, id) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id });
    });
};

const getAllHistorias = (req, res) => {
    historiaModel.getAllHistorias((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

const getHistoriaById = (req, res) => {
    const { id } = req.params;
    historiaModel.getHistoriaById(id, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "História não encontrada" });
        }
        res.json(row);
    });
};

const updateHistoria = (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, categoria, conteudo } = req.body;

    if (!titulo || !descricao || !categoria) {
        return res.status(400).json({ error: "Campos obrigatórios: titulo, descricao, categoria" });
    }

    historiaModel.updateHistoria(id, titulo, descricao, categoria, conteudo, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (changes === 0) {
            return res.status(404).json({ error: "História não encontrada" });
        }
        res.json({ message: "História atualizada" });
    });
};

const deleteHistoria = (req, res) => {
    const { id } = req.params;
    historiaModel.deleteHistoria(id, (err, changes) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (changes === 0) {
            return res.status(404).json({ error: "História não encontrada" });
        }
        res.json({ message: "História removida" });
    });
};

const generateContent = async (req, res) => {
    const { id } = req.params;

    historiaModel.getHistoriaById(id, async (err, story) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!story) {
            return res.status(404).json({ error: "História não encontrada" });
        }

        const prompt = `Escreva uma pequena história em português com o tema ${story.categoria}.`;

        try {
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent', {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {
                    key: GEMINI_API_KEY
                }
            });

            const generatedContent = response.data.candidates[0].content.parts[0].text.trim();
            const updatedContent = story.conteudo + generatedContent;
            console.log(response.data.candidates[0]);

            historiaModel.updateHistoria(id, story.titulo, story.descricao, story.categoria, updatedContent, (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: "Conteúdo gerado", conteudo: updatedContent });
            });

        

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};

module.exports = {
    createHistoria,
    getAllHistorias,
    getHistoriaById,
    updateHistoria,
    deleteHistoria,
    generateContent
};
