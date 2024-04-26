const express = require('express');
const router = express.Router();
const path = require('path');

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

module.exports = router;
