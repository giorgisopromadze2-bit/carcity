const express = require("express");
const router = express.Router();
const { cloudinary, upload } = require("../config/cloudinary");

router.post("/", upload.array("images", 20), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) 
            return res.status(400).json({ message: "No files uploaded" });
        const urls = req.files.map(file => ({
            url: file.path,
            public_id: file.filename
        }));
        res.json({ urls });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/", async (req, res) => {
    try {
        const { public_id } = req.body;
        await cloudinary.uploader.destroy(public_id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;