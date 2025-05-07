const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    const { userName, userEmail, userPassword, confirmPassword } = req.body;

    if (!userName || !userEmail || !userPassword || !confirmPassword) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    if (userPassword !== confirmPassword) {
        return res.status(422).json({ message: 'As senhas não conferem' });
    }

    const userExists = await User.findOne({ email: userEmail });

    if (userExists) {
        return res.status(422).json({ message: 'E-mail já cadastrado' });
    }


    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userPassword, salt);

    const user = new User({
        name: userName,
        email: userEmail,
        password: passwordHash
    })

    try {
        await user.save();
        res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Ops, parece que aconteceu algum erro no servidor, por favor, tente novamente mais tarde!' });
    }

    


}

