const { User } = require('../configDB');

const UserController = {
    // Criar um novo usuário
    create: async (req, res) => {
        const { nome, email, login, senha, tipo } = req.body;
        try {
            const user = await User.create({ nome, email, login, senha, tipo });
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter todos os usuários
    getAllavaliadores: async (req, res) => {
        try {
            const { tipo } = req.query;
            let users;
    
            if (tipo && tipo.toLowerCase() === 'avaliador') {
                users = await User.findAll({ where: { tipo: 'Avaliador' } });
            } else {
                users = await User.findAll();
            }
    
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Obter um usuário por ID
    getById: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Atualizar um usuário
    update: async (req, res) => {
        const { id } = req.params;
        const { nome, email, login, senha, tipo } = req.body;
        try {
            const [updated] = await User.update({ nome, email, login, senha, tipo }, { where: { id } });
            if (updated) {
                const updatedUser = await User.findByPk(id);
                res.status(200).json(updatedUser);
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Deletar um usuário
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await User.destroy({ where: { id } });
            if (deleted) {
                res.status(204).json({ message: 'Usuário deletado' });
            } else {
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    
 
};

module.exports = UserController;