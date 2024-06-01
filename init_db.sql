CREATE TABLE IF NOT EXISTS historias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    categoria TEXT NOT NULL,
    conteudo TEXT
);

INSERT INTO historias (titulo, descricao, categoria, conteudo) VALUES 
("Aventura na Floresta", "Uma emocionante jornada através de uma floresta mágica.", "Aventura", ""),
("Mistério no Museu", "Um misterioso caso de roubo de uma pintura valiosa.", "Mistério", ""),
("Amor nas Estrelas", "Uma história de amor intergaláctica.", "Romance", "");
