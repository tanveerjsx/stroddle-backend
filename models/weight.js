const mongoose= require('mongoose')

const WeightSchema= new mongoose.Schema({

  name:{type:String, required:true}
})
module.exports=mongoose.model("Weight",WeightSchema)