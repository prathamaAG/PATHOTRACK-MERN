const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    status:{
        default:"Pending",
        type:String
    },
    age:{
        required:true,
        type:String
    },
    address:{
        required:true,
        type:String
    },
    mobile:{
        type: String,
        required: true
    },
    examinedBy:{
        required:true,
        type:String
    },
    examinedDate: {
        required:true,
        type:String
    },
    test: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Test',  
        required: true
    },
    reportedDate: {
        required: true,
        type: String
    },
    result: [
        {
            name:{
                required:true,
                type: String
            },
            range:{
                required:true,
                type: String
            },
            unit:{
                required:true,
                type: String
            },
            result:{
                required:true,
                type: String
            }
        }
    ]
},{
    timestamps: true  
});

const repo = mongoose.model('patient', schema);
module.exports=repo;
