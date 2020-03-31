const Weight = require('./../models/weight');

const getAllWeights = () => {
  return Weight.find({});
};
const weightObject = req => {
  return new Weight({
    ...req,
  });
};
const saveWeight = weight => {
  return weight.save();
};

const weightServices = {
  getAllWeights,
  weightObject,
  saveWeight,
};

module.exports = weightServices;
