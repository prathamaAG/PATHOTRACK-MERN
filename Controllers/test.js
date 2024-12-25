const Test = require('../Models/testmodel');

// Handler for posting a new test
exports.postTest = async (req, res) => {
    try {
        const body = req.body;
        const isDataExist = await Test.findOne({ name: body.name });

        if (isDataExist) {
            res.status(409).json({
                status: "fail",
                message: "Data already exists"
            });
        } else {
            const dataEnter = await Test.create(body);
            res.status(201).json({
                message: "Added successfully",
                status: "success",
                data: dataEnter
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Technical fault"
        });
    }
};

// Handler for getting all tests
exports.getTest = async (req, res) => {
    try {
        const testData = await Test.find({});
        if (testData && testData.length > 0) {
            res.status(200).json({
                message: "Tests available",
                status: "success",
                data: testData
            });
        } else {
            res.status(200).json({
                message: "No tests available",
                status: "fail"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Technical fault"
        });
    }
};

// Handler for getting a test by ID
exports.getTestByid = async (req, res) => {
    const { id } = req.params;
    try {
        const testData = await Test.findById(id);
        if (testData) {
            res.status(200).json({
                message: "Test available",
                status: "success",
                data: testData
            });
        } else {
            res.status(404).json({
                message: "No test found",
                status: "fail"
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Technical fault"
        });
    }
};
