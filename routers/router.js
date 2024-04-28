const express = require('express');
const router = express.Router();
const path = require('path');
const ArticleController = require('../controllers/articleController.js');
const UserController = require('../controllers/UserController.js');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/loginPage.html'));
});

router.get('/autor', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inicioAutor.html'));
});

router.get('/aval', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inicioAvaliador.html'));
});

router.get('/adm', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/inicioAdmin.html'));
});

// Rota para buscar todos os artigos
router.get('/articles', ArticleController.getAll);

// Rota para atualizar um artigo
router.put('/articles/:id', ArticleController.update);

// Rota para obter todos os usuários
router.get('/users', UserController.getAllavaliadores);

  


module.exports = router;