module.exports = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json(
            { message: "O campo name é obrigatorio!" }
        );
    }

    if (name.length < 4) {
        return res.status(400).json(
            { message: "O campo name deve ter pelomenos 4 caracteres!" }
        );
    } 

    next();
};