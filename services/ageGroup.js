const AgeGroup = require('./../models/ageGroup');

const getAllAgeGroups = () => {
  return AgeGroup.find({});
};
const ageGroupObject = req => {
  return new AgeGroup({
    ...req,
  });
};
const saveAgeGroup = ageGroup => {
  return ageGroup.save();
};

const ageGroupServices = {
  getAllAgeGroups,
  ageGroupObject,
  saveAgeGroup,
};

module.exports = ageGroupServices;
