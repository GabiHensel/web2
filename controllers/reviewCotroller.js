const { Review, User, Article } = require('../configDB.js');

const ReviewController = {
    // Criar uma nova revisão
    create: async (req, res) => {
        const { nota1, nota2, userId, articleId } = req.body;
        try {
            const review = await Review.create({ nota1, nota2, userId, articleId });
            res.status(201).json(review);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter todas as revisões
    getAll: async (req, res) => {
        try {
            const reviews = await Review.findAll({
                include: [User, Article]
            });
            res.status(200).json(reviews);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter uma revisão por ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const review = await Review.findByPk(id, {
                include: [User, Article]
            });
            if (review) {
                res.status(200).json(review);
            } else {
                res.status(404).json({ message: 'Revisão não encontrada' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Atualizar uma revisão
    update: async (req, res) => {
        const { id } = req.params;
        const { nota1, nota2 } = req.body;
        try {
            const [updated] = await Review.update({ nota1, nota2 }, { where: { id } });
            if (updated) {
                const updatedReview = await Review.findByPk(id, {
                    include: [User, Article]
                });
                res.status(200).json(updatedReview);
            } else {
                res.status(404).json({ message: 'Revisão não encontrada' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Deletar uma revisão
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await Review.destroy({ where: { id } });
            if (deleted) {
                res.status(204).json({ message: 'Revisão deletada' });
            } else {
                res.status(404).json({ message: 'Revisão não encontrada' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Atribuir um artigo a um avaliador
    assignArticle: async (req, res) => {
        const { userId, articleId } = req.body;
        try {
            const user = await User.findByPk(userId);
            const article = await Article.findByPk(articleId);
            if (user && article) {
                if (user.tipo === 'avaliador') {
                    const review = await Review.create({ userId, articleId });
                    res.status(201).json(review);
                } else {
                    res.status(400).json({ message: 'O usuário não é um avaliador' });
                }
            } else {
                res.status(404).json({ message: 'Usuário ou artigo não encontrado' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Avaliar um artigo
    evaluateArticle: async (req, res) => {
        const { id, nota1, nota2 } = req.body;
        try {
            const review = await Review.findByPk(id);
            if (review) {
                await review.update({ nota1, nota2 });
                res.status(200).json(review);
            } else {
                res.status(404).json({ message: 'Avaliação não encontrada' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};
module.exports = ReviewController;
