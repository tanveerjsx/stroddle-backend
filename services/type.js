const Type = require('./../models/type');

const getAllTypes = () => {
  return Type.find({});
};
const typeObject = req => {
  return new Type({
    ...req,
  });
};
const saveType = type => {
  return type.save();
};

const typeServices = {
  getAllTypes,
  typeObject,
  saveType,
};

module.exports = typeServices;
