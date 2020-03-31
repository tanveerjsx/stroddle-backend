const Feature = require('./../models/features');

const getAllFeatures = () => {
  return Feature.find({});
};
const featureObject = req => {
  return new Feature({
    ...req,
  });
};
const saveFeature = feature => {
  return feature.save();
};

const featureServices = {
  getAllFeatures,
  featureObject,
  saveFeature,
};

module.exports = featureServices;
