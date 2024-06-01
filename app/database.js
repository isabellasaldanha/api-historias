const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite'); 

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS historias (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            categoria TEXT NOT NULL,
            conteudo TEXT
        )
    `, (err) => {
        if (err) {
            console.error("Erro: ", err);
        } else {
            console.log("Tabela criada com sucesso");
        }
    });
});

module.exports = db;
