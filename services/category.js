const Category = require('./../models/category');

const getAllCategories = () => {
  return Category.find({});
};
const categoryObject = req => {
  return new Category({
    ...req,
  });
};
const saveCategory = category => {
  return category.save();
};

const categoryServices = {
  getAllCategories,
  categoryObject,
  saveCategory,
};

module.exports = categoryServices;
