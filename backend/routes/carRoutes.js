const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
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
    const newCar = new Car(req.body);
    await newCar.save();
    res.json(newCar);
});

router.put("/:id", async (req, res) => {
    try{
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

router.delete("/:id", async (req, res) => {
    try{
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ message: "Invalid id" });
    }
})

module.exports = router;