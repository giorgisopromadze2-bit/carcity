const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({

    title: { type: String, trim: true },

    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 1900, max: new Date().getFullYear() + 1 },
    price: { type: Number, required: true, min: 0 },

    status: {
        type: String,
        enum: ["active", "sold", "pending"],
        default: "pending"
    },

    images: [{
        url: { type: String },
        public_id: { type: String }
    }],

    mileage:      { type: Number, min: 0 },
    engine:       { type: String, trim: true },     
    power:        { type: Number, min: 0 },     
    fuel:         { type: String, trim: true },  
    transmission: { type: String, trim: true },
    drivetrain:   { type: String, trim: true }, 
    exterior:     { type: String, trim: true }, 
    interior:     { type: String, trim: true },
    vin:          { type: String, trim: true, uppercase: true },
    steering:     { type: String, enum: ["Left", "Right"], default: "Left" },
    customs:      { type: String, enum: ["Cleared", "Not Cleared"], default: "Cleared" }, 
    owners:       { type: Number, min: 1 },
    seats:        { type: Number, min: 1, max: 20 },

    description:  { type: String, trim: true },
    equipment: {
        comfort:      { type: [String], default: [] },
        technology:   { type: [String], default: [] },
        safety:       { type: [String], default: [] },
        performance:  { type: [String], default: [] },
    },

    contact: {
        name:  { type: String, trim: true },
        phone: { type: String, trim: true },
    },

    location: { type: String, trim: true },

}, { timestamps: true });

carSchema.index({ brand: 1, model: 1 });
carSchema.index({ price: 1 });
carSchema.index({ year: -1 });
carSchema.index({ status: 1 });
carSchema.index({ fuel: 1 });

module.exports = mongoose.model("Car", carSchema);