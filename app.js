const { sequelize, User, Article, Review } = require('./configDB.js');
const path = require('path');
const express = require('express');
const router = require('./routers/router.js');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync()
    .then(async () => {
        console.log('Tabelas sincronizadas com sucesso');

        // Criação do autor, avaliador, artigo e revisão
        try {
            const [author, createdAuthor] = await User.findOrCreate({
                where: { login: 'teste' },
                defaults: { nome: 'Yara', email: 'admin@example.com', senha: 'admin', tipo: 'Administrador' }
            });
            console.log('Autor criado:', author.get({ plain: true }));

            const [evaluator, createdEvaluator] = await User.findOrCreate({
                where: { login: 'teste2' },
                defaults: { nome: 'Sabryna', email: 'evaluator@example.com', senha: 'evaluator', tipo: 'Avaliador' }
            });
            console.log('Avaliador criado:', evaluator.get({ plain: true }));

            const [article, createdArticle] = await Article.findOrCreate({
                where: { titulo: 'Artigo Exemplo' },
                defaults: { resumo: 'Este é um artigo de exemplo.', link: 'http://example.com/artigo.pdf', status: 'Em revisão' }
            });
            console.log('Artigo criado:', article.get({ plain: true }));

            await article.addAuthor(author);
            console.log('Autor associado ao artigo com sucesso.');

            await article.addEvaluator(evaluator);
            console.log('Avaliador associado ao artigo com sucesso.');

            const [review, createdReview] = await Review.findOrCreate({
                where: { nota1: 5, nota2: 5 },
                defaults: { userId: author.id, articleId: article.id }
            });
            console.log('Revisão criada:', review.get({ plain: true }));
        } catch (error) {
            console.error('Erro ao criar ou associar dados:', error);
        }
    })
    .catch(err => console.log('Erro ao sincronizar o banco de dados:', err));

app.use('/', router);      
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});