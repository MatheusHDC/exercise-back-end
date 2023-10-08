const express = require('express');
const validateTeam = require('./middlewares/validateTeam');
const verificaId = require('./middlewares/verificaId');
const teams = require('./utils/teams')

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Olá Mundo!', name: 'Matheus' }));

app.get('/teams', (req, res) => res.status(200).json({ teams }));

app.post('/teams', validateTeam, (req, res) => {
    const newTeam = { ...req.body };
    teams.push(newTeam);
  
    res.status(201).json({ team: newTeam });
});

app.put('/teams/:id', validateTeam, verificaId, (req, res) => {
    const { id } = req.params;
    const { name, initials } = req.body;
    const updateTeam = teams.find((team) => team.id === Number(id));
  
    updateTeam.name = name;
    updateTeam.initials = initials;
    res.status(200).json({ updateTeam });
});

app.get('/teams/:id', verificaId, (req, res) => {
    const team = teams.find(time => time.id === +req.params.id);    
    res.status(200).json({ team })
});

app.delete('/teams/:id', verificaId, (req, res) => {
    const { id } = req.params;
    const arrayPosition = teams.findIndex((team) => team.id === Number(id));
    teams.splice(arrayPosition, 1);
  
    res.status(200).end();
});

module.exports = app;