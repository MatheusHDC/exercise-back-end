const { Book } = require('../models');

const getAll = async () => {
  const books = await Book.findAll();

  return books;
};

const getById = async (id) => {
  const books = await Book.findByPk(id);

  return books;
};

const create = async (book) => {
  const insertedBook = await Book.create(book);
  return insertedBook;
};

const update = async (book, id) => {
  const updatedBook = await Book.update(book, { where: { id } });
  return updatedBook;
};

const remove = async (id) => {
  const removed = await Book.destroy({ where: { id } });

  return removed;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};