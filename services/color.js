const Color = require('./../models/color');

const getAllColors = () => {
  return Color.find({});
};
const colorObject = req => {
  return new Color({
    ...req,
  });
};
const saveColor = color => {
  return color.save();
};

const colorServices = {
  getAllColors,
  colorObject,
  saveColor,
};

module.exports = colorServices;
