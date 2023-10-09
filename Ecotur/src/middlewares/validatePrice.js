module.exports = (req, res, next) => {
    const { price } = req.body;
    if (price === undefined) {
        return res.status(400).json(
            { message: "O campo price é obrigatorio!" }
        );
    }

    if (price < 0 || typeof price !== 'number') {
        return res.status(400).json(
            { message: "O campo price deve se um numero maior ou igual a zero!" }
        );
    } 

    next();
};