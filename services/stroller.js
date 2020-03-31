const Stroller = require('./../models/stroller');
const Feature = require('./../models/features');
const Color = require('./../models/color');
const Brand = require('./../models/brand');
const Category = require('./../models/category');
const Type = require('./../models/type');
const AgeGroup = require('./../models/ageGroup');
const Weight = require('./../models/weight');
const Rent = require('./../models/rent');
const Model = require('./../models/model');

const getAllStrollers = () => {
  return Stroller.find({}).populate(
    'features categories brand ageGroup color weight type rent model',
    'name rent -_id',
  );
};

const strollerObject = req => {
  return new Stroller({
    images: req.images,
    price: req.price,
    name: req.name,
    rating: req.rating,
    rent: req.rent,
    ageGroup: req.ageGroup,
    categories: req.categories,
    brand: req.brand,
    color: req.color,
    weight: req.weight,
    features: req.features,
    owner: req.owner,
    location: {
      type: 'Point',
      coordinates: req.location,
    },
    availabilityFrom: req.availabilityFrom,
    availabilityTo: req.availabilityTo,
    type: req.type,
    description: req.description,
    rent: req.rent,
    model: req.model,
  });
};
const saveStroller = type => {
  return type.save();
};
const getStrollersProperties = async () => {
  const features = await Feature.find({});
  const colors = await Color.find({});
  const weights = await Weight.find({});
  const brands = await Brand.find({});
  const types = await Type.find({});
  const categories = await Category.find({});
  const agegroups = await AgeGroup.find({});
  const rents = await Rent.find({});
  const models = await Model.find({});
  return (strollerProperties = {
    features,
    brands,
    colors,
    weights,
    types,
    categories,
    agegroups,
    models,
    rents,
  });
};

const filterStroller = data => {
  //return Stroller.find({features: { $in: data.features }})
  return Stroller.find({ $or: [ { price: { $gte: data.priceFrom, $lte: data.priceTo }},
   { type: { $in: data.types }},
    {color: { $in: data.color }},
    {brand: { $in: data.brand }},
    {features: { $in: data.features }}
  ]}).populate('ageGroup features categories brand color weight type rent','name rent -_id');
  // .or([
  //   $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } 
  //   { price: { $gte: data.priceFrom, $lte: data.priceTo } }
  //   {
  //     type: { $in: data.types },
  //     color: { $in: data.color },
  //     brand: { $in: data.brand },
  //     features: { $in: data.features },
  //   }
  // ])
  
  // .and([{price:{$gte:data.priceFrom, $lte:data.priceTo}}])

  //return Stroller.find({price:{$gte:data.priceFrom, $lte:data.priceTo}})
  // return Stroller.find({price:{$gte:data.priceFrom, $lte:data.priceTo},type:{$in:data.types},color:{$in:data.color},brand:{$in:data.brand}})
  //  .and([{price:{$gte:data.priceFrom, $lte:data.priceTo}}])
  //.and([{type:{$in:data.types}}])
  //.and([{price:{$gte:data.priceFrom, $lte:data.priceTo}}])
  //.and([{features:{$in:data.features}}])

  // return Stroller.find().
  // populate('types, features').
  // where('brand').equals(`${data.brand}`).
  // where('color').equals(`${data.color}`).
  // where('price').gt(`${data.priceFrom}`).lt(`${data.priceTo}`).
  // and({'features':`${data.types}`})
  //where('type').in(`${data.types}`)
  // where(`features`).in(`${data.features}`)
};
const strollerServices = {
  filterStroller,
  getAllStrollers,
  saveStroller,
  strollerObject,
  getStrollersProperties,
};

module.exports = strollerServices;
