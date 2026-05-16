const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    mileage: { type: String, required: true },
    fuel: { type: String, required: true },
    transmission: { type: String, required: true },
    image: { type: String, default: "" },
    description: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);