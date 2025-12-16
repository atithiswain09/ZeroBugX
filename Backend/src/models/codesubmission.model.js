const mongoose=require('mongoose');

const CodeSubmissionSchema=new mongoose.Schema({
   
    userId:{

    },
    title:{
        type:String,
        trim:true,
        default: 'Untitled Review'
    },
    
    userPrompt:{
        type:String,requ
    }



})