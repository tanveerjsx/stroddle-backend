const Model = require('./../models/model');

const getAllModels = () => {
  return Model.find({});
};
const modelObject = req => {
  return new Model({
    ...req,
  });
};
const saveModel = model => {
  return model.save();
};

const modelServices = {
  getAllModels,
  modelObject,
  saveModel,
};

module.exports = modelServices;
