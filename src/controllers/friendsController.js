const User = require('../models/User');

exports.addFriend = (req, res) => {
    const { userId } = req.params;
    const { friendEmail } = req.body;
    if (!friendEmail) {
        return res.status(400).send('Preencha todos os campos obrigatórios.');
    }

    if (!userId) {
        return res.status(400).send('Preencha todos os campos obrigatórios.');
    }
     const user = User.findById(userId);

    if (!user) {
        return res.status(404).send('Usuário não encontrado.');
    }

    const friend = User.findOne({ email: friendEmail });
    if (!friend) {
        return res.status(404).send('Amigo não encontrado.');
    }
    
    if (user.friends.includes(friend._id)) {
        return res.status(400).send('Você já é amigo deste usuário.');
    }

    user.friends.push(friend._id);
    
    res.status(200).json({ message: 'Amigo adicionado com sucesso.' });
}