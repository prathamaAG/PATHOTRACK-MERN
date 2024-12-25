const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pathology-backend').then(()=>{
    console.log("MongoDB connected succesfully");
}).catch(err=>{
    console.log("Something Went Wrong");
})