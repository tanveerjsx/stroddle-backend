const mongoose= require('mongoose')

const TypeSchema= new mongoose.Schema({

  name:{type:String, required:true}
})
module.exports=mongoose.model("Type",TypeSchema)