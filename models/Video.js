const mongoose = require('mongoose');
const { Schema } = mongoose;


const videoSchema = new Schema({
   url :{
       type:String
   },
   Time:[Number],
   Question:[
       {
           Ans:[String],
           Ques:String,
           trueAns:String
       }
   ]
    
});

mongoose.model('video',videoSchema );