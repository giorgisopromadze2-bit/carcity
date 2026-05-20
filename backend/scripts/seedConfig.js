require("dotenv").config();
const mongoose = require("mongoose");
const Config = require("../models/Config");


const SEED = [
    {
        key: "brands",
        value: ["BMW", "Porsche", "Tesla", "Mercedes", "Audi", "Toyota", "Ford", "Lexus"]
    },
    {
        key: "fuels",
        value: ["Petrol", "Electric", "Hybrid", "Diesel"]
    },
    {
        key: "transmissions",
        value: ["Automatic", "Manual"]
    },
    {
        key: "allSpecs",
        value: [
            { key: "year",         label: "YEAR",         icon: "/specifications/calendar1.png" },
            { key: "mileage",      label: "MILEAGE",      icon: "/specifications/mileage2.png" },
            { key: "engine",       label: "ENGINE",       icon: "/specifications/engine1.png" },
            { key: "power",        label: "POWER",        icon: "/specifications/hp2.png" },
            { key: "fuel",         label: "FUEL",         icon: "/specifications/fuel.png" },
            { key: "transmission", label: "TRANSMISSION", icon: "/specifications/transmission.png" },
            { key: "drivetrain",   label: "DRIVETRAIN",   icon: "/specifications/drivetrain.png" },
            { key: "exterior",     label: "EXTERIOR",     icon: "/specifications/exinterior.png" },
            { key: "interior",     label: "INTERIOR",     icon: "/specifications/exinterior.png" },
            { key: "vin",          label: "VIN",          icon: "/specifications/vin.png" },
            { key: "steering",     label: "STEERING",     icon: "/specifications/steering.png" },
            { key: "customs",      label: "CUSTOMS",      icon: "/specifications/customs.png" },
            { key: "owners",       label: "OWNERS",       icon: "/specifications/owners.png" },
            { key: "seats",        label: "SEATS",        icon: "/specifications/seats.png" },
        ]
    },
    {
        key: "equipmentCats",
        value: [
            {
                key: "comfort", label: "Comfort", icon: "/sparkles1.png",
                suggestions: ["Heated seats","Ventilated seats","Ambient lighting","Panoramic roof","Memory seats","4-zone climate","Massage seats","Keyless entry"]
            },
            {
                key: "technology", label: "Technology", icon: "/technology.png",
                suggestions: ["Apple CarPlay","Android Auto","Heads-Up Display","360° Camera","Premium navigation","Wireless charging","Premium sound","Digital cockpit"]
            },
            {
                key: "safety", label: "Safety", icon: "/icons/shield.png",
                suggestions: ["Lane keep assist","Blind spot monitor","Adaptive cruise","Parking sensors","Auto emergency brake","Driver attention","Night vision","Rear camera"]
            },
            {
                key: "performance", label: "Performance", icon: "/performance.png",
                suggestions: ["Sport package","Adaptive suspension","Sport exhaust","Launch control","Carbon ceramic brakes","Performance tires","Sport differential","Track mode"]
            },
        ]
    },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
    for(const item of SEED) {
        await Config.findOneAndUpdate(
            { key: item.key },
            { value: item.value },
            { upsert: true }
        );
        console.log(`✓ seeded: ${item.key}`);
    }
    console.log("Done.");
    process.exit(0);
}).catch(err => { 
    console.error(err); 
    process.exit(1);
});