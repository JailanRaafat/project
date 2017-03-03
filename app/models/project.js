var mongoose = require('mongoose');


var projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true, 
        unique:true
    },
    URL:String,
    username: {
    	type: String,
    	required: true
    }
})

      
module.exports=mongoose.model("Project", projectSchema); 
