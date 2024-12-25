const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: String
    },
    fasting: {
        required: true,
        type: String
    },
    imglink: {
        required: false,
        type: String,
        default: "https://prod-images-static.radiopaedia.org/images/10136416/502185e27fd4aadd6f1bcc65dd5738d4ed8da4aaec6e901cf5d07fc62768cdf3_big_gallery.jpeg"
    },
    normalRange: {
        required: true,
        type: String
    },
    abnormalRange: {
        required: true,
        type: String
    }
}, {
    timestamps: true
});

const Test = mongoose.model('Test', schema);

module.exports = Test;
