const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

const generateTitle = ({ brand, model }) => [brand, model].filter(Boolean).join(" ").trim();

router.get("/", async (req, res) => {
    try{
        const filter = {};
        const { 
            brand, model, fuel, transmission, drivetrain, status, 
            minPrice, maxPrice, minYear, maxYear, minMileage, maxMileage 
        } = req.query;
        if (brand) filter.brand = brand;
        if (model) filter.model = model;
        if (fuel) filter.fuel = fuel;
        if (transmission) filter.transmission = transmission;
        if (drivetrain) filter.drivetrain = drivetrain;
        if (status) {
            filter.status = status;
        } else {
            filter.status = "active";
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        } 
        if (minYear || maxYear) {
            filter.year = {};
            if (minYear) filter.year.$gte = Number(minYear);
            if (maxYear) filter.year.$lte = Number(maxYear);
        }
        if (minMileage || maxMileage) {
            filter.mileage = {};
            if (minMileage) filter.mileage.$gte = Number(minMileage);
            if (maxMileage) filter.mileage.$lte = Number(maxMileage);
        }
        const cars = await Car.find(filter).sort({ createdAt: -1 });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try{
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: "Not found" });
        res.json(car);
    } catch (err) {
        res.status(400).json({ message: "Invalid id" });
    }
});

router.post("/", async (req, res) => {
    try {
        req.body.title = generateTitle(req.body);
        const newCar = new Car(req.body);
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try{
        req.body.title = generateTitle(req.body);
        const updated = await Car.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if(!updated) return res.status(404).json({ message: "Not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id/status", async (req, res) => {
    try {
        const { status } = req.body;
        if (!["active", "sold", "pending"].includes(status))
            return res.status(400).json({ message: "Invalid status" });

        const updated = await Car.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Not found" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const deleted = await Car.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ message: "Invalid id" });
    }
})

module.exports = router;