const mongoose = require("mongoose")

const Checklistschema = new mongoose.Schema({
    priority : {type : String, required : true},
    name : {type : String, required : true},
    duedate : {type : String},
    markedval : {type : Boolean},
    description : {type : String},
    createdAt : {type : Number, required : true},
    userid : {type : String, required:true},
})

module.exports = mongoose.model("Checklist", Checklistschema)