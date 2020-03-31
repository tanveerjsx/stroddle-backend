const Rent = require('./../models/rent');

const getAllRents = () => {
  return Rent.find({});
};
const rentObject = req => {
  return new Rent({
    ...req,
  });
};
const saveRent = color => {
  return color.save();
};

const rentServices = {
  getAllRents,
  rentObject,
  saveRent,
};

module.exports = rentServices;
