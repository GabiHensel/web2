const { Article, User, Review } = require('../configDB.js');
const article = require('../models/article.js');

const ArticleController = {
    // Criar um novo artigo
    create: async (req, res) => {
        const { titulo, resumo, link, status, autores, nota } = req.body;
        try {
            const article = await Article.create({ titulo, resumo, link, status });
            
            // Adicionar autores ao artigo
            const authors = await User.findAll({ where: { id: autores } });
            await article.setAuthors(authors);
            
            // Adicionar nota ao artigo
            const review = await Review.create({ nota });
            await article.setReview(review);

            res.status(201).json(article);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

// Obter todos os artigos
getAll: async (req, res) => {
    console.log('Acessando a rota /articles');
    try {
        const articles = await Article.findAll({
            include: [{
                model: User,
                as: 'authors' // Use o alias 'authors' definido na associação
            }]
        });
        console.log(articles);
        res.status(200).json(articles);
    } catch (err) {
        console.log('Erro ao buscar artigos:', err);
        res.status(500).json({ error: err.message });
    }
},


    // Obter um artigo por ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const article = await Article.findByPk(id, {
                include: [{ model: User, as: 'authors' }, Review]
            });
            if (article) {
                res.status(200).json(article);
            } else {
                res.status(404).json({ message: 'Artigo não encontrado' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

   // Atualizar um artigo
update: async (req, res) => {
    
    const { id } = req.params;
    const { titulo, resumo, link, status, autores, nota } = req.body;
    try {
        const [updated] = await Article.update({ titulo, resumo, link, status }, { where: { id } });
        if (updated) {
            const updatedArticle = await Article.findByPk(id, {
                include: [User, Review]
            });

            // Atualizar autores do artigo
            const authors = await User.findAll({ where: { id: autores } });
            await updatedArticle.setAuthors(authors);
            
            // Atualizar nota do artigo
            const review = await Review.findOne({ where: { articleId: id } });
            await review.update({ nota });

            res.status(200).json(updatedArticle);
        } else {
            res.status(404).json({ message: 'Artigo não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},


    // Deletar um artigo
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await Article.destroy({ where: { id } });
            if (deleted) {
                res.status(204).json({ message: 'Artigo deletado' });
            } else {
                res.status(404).json({ message: 'Artigo não encontrado' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = ArticleController;
