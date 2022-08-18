const express = require ('express');
const server = express ();
const pool = require ('./query');

server.use(express.json());

//Retornar todos os cursos
server.get('/cursos', (req, res) => {
    pool.query('SELECT * FROM cursos ORDER BY id ASC', (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
    });
});

//Retornar um curso
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;

    pool.query('SELECT * FROM cursos WHERE id = $1', [index], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json(results.rows);
    });
});

//Criar um novo curso
server.post('/cursos', (req, res) => {
    const { name } = req.body;

    pool.query('INSERT INTO cursos (name) VALUES ($1)', [name], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json("Criado com sucesso!");
    });
});

//Atualizar um curso
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    pool.query('SELECT * FROM cursos WHERE id = $1', [index], (error, results) => {
        if (error) {
          throw error;
        }      
        pool.query('UPDATE cursos SET name=$1 WHERE id = $2', [name, index], (error, results) => {
            if (error) {
              throw error;
            }            
            res.status(200).json("Alterado com sucesso");
        });
    });
});

//Deletar um curso
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;

    pool.query('DELETE FROM cursos WHERE id = $1', [index], (error, results) => {
        if (error) {
          throw error;
        }
        res.status(200).json("Curso apagado com sucesso!");
    });
});

server.listen(3000);