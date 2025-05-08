const User = require('../models/user');

exports.addFriend = async (req, res) => {
    const { userId } = req.params;
    const { friendEmail } = req.body;
    if (!friendEmail) {
        return res.status(400).send('Preencha todos os campos obrigatórios.');
    }

    if (!userId) {
        return res.status(400).send('Preencha todos os campos obrigatórios.');
    }
     const user = await User.findById(userId);

    if (!user) {
        return res.status(404).send('Usuário não encontrado.');
    }

    const friend = await User.find({ email: friendEmail }, '-password');
    if (!friend) {
        return res.status(404).send('Amigo não encontrado.');
    }

    console.log(friend)
    
    user.friends.push(friend);
    await user.save();


    res.status(200).json({ message: 'Amigo adicionado com sucesso.' });
}