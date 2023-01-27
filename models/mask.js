const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const maskSchema = new Schema ({
    name: String, 
    img: String, 
    description: String, 
    price: Number, 
    owned: Boolean,
});

module.exports = mongoose.model("Mask", maskSchema);