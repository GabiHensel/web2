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

        // 1. Crie o autor
        const [user, createdUser] = await User.findOrCreate({
            where: { login: 'admin' },
            defaults: { nome: 'Autor', email: 'admin@example.com', senha: 'admin', tipo: 'Autor' }
        });
        console.log('Usuário criado:', user.get({ plain: true }));

        // 2. Crie o artigo
        const [article, createdArticle] = await Article.findOrCreate({
            where: { titulo: 'Artigo Exemplo' },
            defaults: { resumo: 'Este é um artigo de exemplo.', link: 'http://example.com/artigo.pdf', status: 'Em revisão' }
        });
        console.log('Artigo criado:', article.get({ plain: true }));

        // 3. Associe o autor ao artigo
        await article.addAuthor(user); // Assumindo que a associação entre artigo e autor seja "addAuthor"
        console.log('Autor associado ao artigo com sucesso.');

        // Se precisar de mais de um autor, basta repetir o passo 3 para cada autor.

        // 4. Crie a revisão
        const [review, createdReview] = await Review.findOrCreate({
            where: { nota1: 5, nota2: 5 },
            defaults: { userId: user.id, articleId: article.id }
        });
        console.log('Revisão criada:', review.get({ plain: true }));
        
    })
    .catch(err => console.log('Erro ao sincronizar o banco de dados:', err));


    app.use('/', router);      

      app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
      });