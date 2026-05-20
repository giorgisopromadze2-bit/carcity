const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    title:            { type: String, required: true },
    brand:            { type: String, required: true },
    price:            { type: Number, required: true },
    year:             { type: Number, required: true },
    mileage:          { type: String, required: true },
    fuel:             { type: String, required: true },
    transmission:     { type: String, required: true },
    images:           { type: [String], default: [] },
    description:      { type: String, default: "" },
    phone:            { type: String, default: "" },
    location:         { type: String, default: "" },
    specs: {
        engine:       { type: String, default: "" },
        power:        { type: String, default: "" },
        torque:       { type: String, default: "" },
        acceleration: { type: String, default: "" },
        topSpeed:     { type: String, default: "" },
        drivetrain:   { type: String, default: "" },
        exterior:     { type: String, default: "" },
        interior:     { type: String, default: "" },
        vin:          { type: String, default: "" },
        steering:     { type: String, default: "" },
        customs:      { type: String, default: "" },
        owners:       { type: String, default: "" },
        seats:        { type: String, default: "" },
    },
    equipment: {
        comfort:      { type: [String], default: [] },
        technology:   { type: [String], default: [] },
        safety:       { type: [String], default: [] },
        performance:  { type: [String], default: [] },
    },
    published:        { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model("Car", carSchema);