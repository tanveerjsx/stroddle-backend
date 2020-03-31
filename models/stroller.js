const mongoose = require('mongoose');

const strollerSchema = new mongoose.Schema({
  images: [{
    type: String,
    required: true,
  }],
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  availabilityFrom:{type:Date, required:true},
  availabilityTo:{type:Date, required:true},
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  model:{type:mongoose.Schema.Types.ObjectId, required:false, ref:"Model"},  
  rent:{type:mongoose.Schema.Types.ObjectId, required:false, ref:"Rent"},
  ageGroup: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'AgeGroup' },
  categories: { type: mongoose.Schema.Types.ObjectId, requird: false, ref: 'Category' },
  brand: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Brand' },
  color: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Color' },
  weight: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Weight' },
  type: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Type' },
  features: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Feature',
    },
  ],
  description:{type:String, required:true},
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});
module.exports = mongoose.model('Stroller', strollerSchema);
