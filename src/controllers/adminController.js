const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.viewUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.send(users);
}

exports.viewUser = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(422).json({ message: 'ID não fornecido' });
    }

    const user = await User.findById(id, '-password');
    if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.send(user);
}

exports.createUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    if (password !== confirmPassword) {
        return res.status(422).json({ message: 'As senhas não conferem' });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
        return res.status(422).json({ message: 'E-mail já cadastrado' });
    }


    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    })

    try {
        await user.save();
        res.status(200).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Ops, parece que aconteceu algum erro no servidor, por favor, tente novamente mais tarde!' });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.body;
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

exports.updateUser = async (req, res) => {
    const { id } = req.body;
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