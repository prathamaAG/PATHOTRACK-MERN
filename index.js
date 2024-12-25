const  express = require('express');
const app =  express();
const bodyParser = require("body-parser");
const PORT = 3000;
const cors= require('cors');
app.use(bodyParser.json());
app.use(cors());
require('./connection.js');
const TestRoute = require("./Routes/testRoutes.js");
const PatientRoutes = require("./Routes/patientRoutes.js");

app.use('/test',TestRoute);
app.use('/patient',PatientRoutes);

app.listen(PORT,()=>{
    console.log("local host is running on the port no.3000");
})