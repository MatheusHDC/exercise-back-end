const express = require('express');

const fs = require('fs');
const path = require('path');
const moviesPath = path.resolve(__dirname,'../movies.json')

const moviesData = JSON.parse(fs.readFileSync(moviesPath));

const app = express();

app.use(express.json());

app.get('/movies', (req, res) => res.status(200).json({ moviesData }));

app.get('/movies/search', async (req, res) => {
    const { q } = req.query;
    const movies = [...moviesData];
    
    if (q) {
        const filteredMovies = movies.filter((element) => element.movie.toLowerCase().includes(q));
        return res.status(200).json(filteredMovies);
    }
    res.status(200).end();
 });

app.get('/movies/:id', (req, res) => {
    const movie = moviesData.find((movie) => movie.id === +req.params.id);
    return res.status(200).json({ movie });
});

app.post('/movies', (req, res) => {
    const id = moviesData[moviesData.length -1].id + 1;
    const movie = req.body;
    const newMovies = JSON.stringify([...moviesData, { id, ...movie }]);
    fs.writeFileSync(moviesPath, newMovies);
    return res.status(201).json(newMovies)
});

app.put('/movies/:id', async (req, res) => {
    const movies = [...moviesData];
    const { id } = req.params;
    const { movie, price } = req.body;
    const index = movies.findIndex((element) => element.id === Number(id));
    movies[index] = { id: Number(id), movie, price };
    const updatedMovies = JSON.stringify(movies, null, 2);
    fs.writeFileSync(moviesPath, updatedMovies);
    res.status(200).json(movies[index]);
});

app.delete('/movies/:id', async (req, res) => {
    const movies = [...moviesData];
    const { id } = req.params;
    const updatedMovies = JSON.stringify(movies.filter((movie) => movie.id !== Number(id)), null, 2);
    fs.writeFileSync(moviesPath, updatedMovies);
    res.status(204).end();
});

module.exports = app;