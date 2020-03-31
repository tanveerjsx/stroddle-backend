const router = require('express').Router();
const categoryServices = require('./../services/category');

router.post('/', async (req, res) => {
  if (!req.body.name) res.status(400).json({message: "category is required"});
  const category = categoryServices.categoryObject(req.body);
  try {
    const saveCategory = await categoryServices.saveCategory(category);
    res.status(201).json({ message: saveCategory });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.get('/', async (req, res) => {
  try {
    const category = await categoryServices.getAllCategories();
    if (!category) {
      return res.status(400).json({ message: 'category not found..' });
    }
    res.status(200).json({ message: category });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
