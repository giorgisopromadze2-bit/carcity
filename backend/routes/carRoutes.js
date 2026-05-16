const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

router.get("/", async (req, res) => {
    const cars = await Car.find();
    res.json(cars);
});

router.post("/", async (req, res) => {
    const newCar = new Car(req.body);
    await newCar.save();
    res.json(newCar);
});

module.exports = router;