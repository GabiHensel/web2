const { sequelize, User, Article, Review } = require('./configDB.js');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const port = 3000;
const router = require('./routers/router.js'); 

sequelize.sync()
    .then(async () => {
        console.log('Tabelas criadas com sucesso');

        const [user, createdUser] = await User.findOrCreate({
            where: { login: 'admin' },
            defaults: { nome: 'Admin', email: 'admin@example.com', senha: 'admin', tipo: 'Administrador' }
        });

        const [article, createdArticle] = await Article.findOrCreate({
            where: { titulo: 'Artigo Exemplo' },
            defaults: { resumo: 'Este é um artigo de exemplo.', link: 'http://example.com/artigo.pdf', status: 'Em revisão' }
        });

        const [review, createdReview] = await Review.findOrCreate({
            where: { nota1: 5, nota2: 5 },
            defaults: { avaliadorId: user.id, artigoId: article.id }
        });
    })
    .catch(err => console.log('Erro ao sincronizar o banco de dados:', err));

    app.use('/', router);      

      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });