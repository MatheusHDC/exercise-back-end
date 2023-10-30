const { bookService } = require('../services');

const getAll = async (_req, res) => {
  try {
    const books = await bookService.getAll();
    return res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.getById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const create = async (req, res) => {
  try {
    const book = req.body;
    const insertedBook = await bookService.create(book);
    res.status(201).json(insertedBook);
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const update = async (req, res) => {
  try {
    const book = req.body;
    const { id } = req.params;
    const updatedBook = await bookService.update(book, id);
    res.status(201).json({ message: 'Book updated' });
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await bookService.remove(id);
    res.status(200).json({ message: 'Book removed' });
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
}