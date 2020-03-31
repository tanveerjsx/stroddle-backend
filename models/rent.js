const mongoose= require('mongoose')

const RentSchema= new mongoose.Schema({

  rent:{type:Number, required:true}
})
module.exports=mongoose.model("Rent",RentSchema)