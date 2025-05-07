const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(422).json({ message: 'Preencha todos os campos' });
    }

    if (userPassword.length < 8) {
        return res.status(422).json({ message: 'A senha deve ter no mínimo 8 caracteres' });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
        return res.status(422).json({ message: 'E-mail não cadastrado. Para realizar o cadastro, vá para a rota "http://localhost:3000/user/register"' });
    }

    const checkPass = await bcrypt.compare(userPassword, user.password);

    if (!checkPass) {
        return res.status(404).json({ message: 'Email ou senha inválidos.' });
    }


    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user._id
        }, secret)
        
        res.status(200).json({ message: 'Login realizado com sucesso!', token: token, userId: user.id});
    } catch (error) {
        return res.status(500).json({ message: 'Ops, parece que aconteceu algum erro no servidor, por favor, tente novamente mais tarde!' });
        
    }


}