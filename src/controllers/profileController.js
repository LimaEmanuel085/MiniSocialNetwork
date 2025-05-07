const User = require('../models/user');

exports.viewProfile = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(422).json({ message: 'ID não fornecido' });
    }

    const user = await User.findById(id, '-password');
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.send(user);
}

exports.updateProfile = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(422).json({ message: 'ID não fornecido' });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ message: 'Nome, email e senha são obrigatórios' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
}

exports.deleteProfile = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(422).json({ message: 'ID não fornecido' });
    }

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
}