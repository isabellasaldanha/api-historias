const db = require('../database');

const createHistoria = (titulo, descricao, categoria, callback) => {
    const sql = "INSERT INTO historias (titulo, descricao, categoria, conteudo) VALUES (?, ?, ?, ?)";
    const params = [titulo, descricao, categoria, ""];
    db.run(sql, params, function(err) {
        callback(err, this ? this.lastID : null);
    });
};

const getAllHistorias = (callback) => {
    const sql = "SELECT * FROM historias";
    db.all(sql, [], callback);
};

const getHistoriaById = (id, callback) => {
    const sql = "SELECT * FROM historias WHERE id = ?";
    db.get(sql, [id], callback);
};

const updateHistoria = (id, titulo, descricao, categoria, conteudo, callback) => {
    const sql = "UPDATE historias SET titulo = ?, descricao = ?, categoria = ?, conteudo = ? WHERE id = ?";
    const params = [titulo, descricao, categoria, conteudo, id];
    db.run(sql, params, function(err) {
        callback(err, this ? this.changes : null);
    });
};

const deleteHistoria = (id, callback) => {
    const sql = "DELETE FROM historias WHERE id = ?";
    db.run(sql, [id], function(err) {
        callback(err, this ? this.changes : null);
    });
};

module.exports = {
    createHistoria,
    getAllHistorias,
    getHistoriaById,
    updateHistoria,
    deleteHistoria
};
