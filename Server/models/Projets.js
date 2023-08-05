const mongoose=require('mongoose');

const ProjetSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    division:{
        type:String,
    },
})

const ProjetModel =mongoose.model("projets",ProjetSchema)
module.exports=ProjetModel