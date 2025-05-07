exports.checkAdmin = (req, res, next) => {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const pass = req.params.pass;

    if (!pass) {
        return res.status(422).json({ message: 'Senha não fornecida' });
    }

    if (pass !== adminPassword) {
        return res.status(401).json({ message: 'Acesso negado. Senha de administrador inválida.' });
    }

    next();
}