const express = require("express");
const router = express.Router();
const { cloudinary, upload } = require("../config/cloudinary");

const uploadMiddleware = (req, res, next) => {
    upload.array("images", 20)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || "Upload failed" });
        }
        next();
    });
};

router.post("/", uploadMiddleware, async (req, res) => {
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
        if (!public_id) return res.status(400).json({ message: "public-id is required" });
        await cloudinary.uploader.destroy(public_id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;