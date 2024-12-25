const Patient = require('../Models/patientmodel');
const Test = require('../Models/testmodel');

exports.postPatient = async(req,res) => {
    try {
        const body = req.body;
        const newUser = await Patient.create(body);
        if (newUser) {
            res.status(200).json({
                data:newUser,
                message: "Patient added successfully"
            })
        } else {
            res.json({
                "error": "Some technical issues",
                "message": "Fail in patient posting"
            });
        }

       // res.status(200).json({
         //   "message":"success in Patient controller"
        //})
        }catch (err) {
            res.status(500).json({
                error:err,
                status:"fail",
                "message": "Technical fault"
            })
    }
}
 
exports.getPatientById = async(req,res) => {
    try {
        const { id } = req.params;
        // Check if the patient exists
        const isUser = await Patient.findById(id); // Fetch the patient by ID
        if (isUser) {
          res.status(200).json({
            data: isUser,
            message: "Patient fetched successfully"
          });
        } else {
          res.status(404).json({
            message: "No such patient exists"
          });
        }
    }
    catch (err) {
        res.status(500).json({
            error:err,
            status:"fail",
            "message": "Technical fault"
        })
  }
}

exports.getPatientByStatus = async(req,res) => {
    try {
        const { statusFind } = req.params;

        const isData = await Patient.find({status:statusFind});
        res.status(200).json({
            message:"fetched success",
            data:isData
        })
    } catch (err) {
        res.status(500).json({
            error: err,
            status:"fail",
            "message": "Technical fault"
        })
    }
}

exports.updatePatient = async(req,res) => {
    try{
        const body = req.body;
        const {id} = req.params;

        const updatePatient = await Patient.updateOne({_id:id},body);
        if(updatePatient){
            res.status(200).json({
                message:"updated successfully",
                data:updatePatient 
            })
        }

    }catch (err) {
        res.status(500).json({
            error: err,
            status:"fail",
            "message": "Technical fault"
        })
    }
}

exports.getpatientTestDetails = async(req,res) => {
    try{
        const {id} = req.params;
        const isPatientData = await Patient.findById(id);
       // console.log(isPatientData)
        if(isPatientData){
            const testDetail = await Test.findById(isPatientData.test);
            res.status(200).json({
                message:"get data successfully",
                Patient:isPatientData,
                test:testDetail
            })

        }


    }catch (err) {
        res.status(500).json({
            error: err,
            status:"fail",
            "message": "Technical fault"
        })
    }
}

exports.deletePatient = async(req,res) => {
    try{
        const {id} = req.params;
        const deletedUser = await Patient.deleteOne({_id:id});
        if(deletedUser.deletedCount>0){
            res.status(200).json({
                message:"patient deleted successfully",
                deletedUser:deletedUser
            })
        }else{
            res.status.json({
                "message":"patient doesnt exist"
            })
        }
    }catch (err) {
        res.status(500).json({
            error: err,
            status:"fail",
            "message": "Technical fault"
        })
    }
}
