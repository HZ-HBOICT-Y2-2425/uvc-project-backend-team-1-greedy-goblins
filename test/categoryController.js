// test/categoryController.js
const createCategory = jest.fn().mockImplementation((req, res) => {
  res.status(201).json({ id: 1, name: req.body.name });
});

const getCategories = jest.fn().mockImplementation((req, res) => {
  res.status(200).json([{ id: 1, name: "Category 1" }]);
});

const getCategory = jest.fn().mockImplementation((req, res) => {
  res
    .status(200)
    .json({ id: req.params.id, name: "Category " + req.params.id });
});

const deleteCategory = jest.fn().mockImplementation((req, res) => {
  res.status(200).json({ message: `Category ${req.params.id} deleted` });
});

const updateCategory = jest.fn().mockImplementation((req, res) => {
  res.status(200).json({ id: req.params.id, name: req.body.name });
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  deleteCategory,
  updateCategory,
};
