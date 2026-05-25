const express = require("express");
const router = express.Router();
const Config = require("../models/Config");

router.get("/", async (req, res) => {
    try{
        const configs = await Config.find();
        const result = {};
        configs.forEach(c => result[c.key] = c.value);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:key", async (req, res) => {
    try{
        const config = await Config.findOne({ key: req.params.key });
        if(!config) return res.status(404).json({ message: "Not found" });
        res.json(config.value);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put("/:key", async (req, res) => {
    try{
        const config = await Config.findOneAndUpdate(
            { key: req.params.key },
            { value: req.body.value },
            { new: true, upsert: true }
        );
        res.json(config.value);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:key", async (req, res) => {
    try{
        const deleted = await Config.findOneAndDelete({ key: req.params.key });
        if (!deleted) return res.status(404).json({ message: "Not found" });
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;