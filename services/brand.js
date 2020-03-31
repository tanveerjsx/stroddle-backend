const Brand = require('./../models/brand');

const getAllBrands = () => {
  return Brand.find({});
};
const brandObject = req => {
  return new Brand({
    ...req,
  });
};
const saveBrand = brand => {
  return brand.save();
};

const brandServices = {
  getAllBrands,
  brandObject,
  saveBrand,
};

module.exports = brandServices;
