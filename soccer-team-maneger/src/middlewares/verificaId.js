const teams = require('../utils/teams');

const verificaId = (req, res, next) => {
    const { id } = req.params;
  
    if(teams[id]) {
      next();
    } else {
      return res.status(404).json({ message: 'Team not fund' })
    }
};

module.exports = verificaId;