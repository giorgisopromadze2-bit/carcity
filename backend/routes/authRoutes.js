const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const passport = require("../config/passport");
const { protect } = require("../middleware/auth");

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//  Register

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields required" });

        const exists = await User.findOne({ email });
        if (exists) 
            return res.status(400).json({ message: "Email already in use" });

        const user = await User.create({ name, email, password });
        const token = signToken(user._id);

        res.status(201).json({
            token, 
            user: { 
                    _id: user._id, 
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//   Login

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: "All fields required" });

        const user = await User.findOne({ email });
        if (!user || !user.password)
            return res.status(400).json({ message: "Invalid credentials" });

        const ok = await user.comparePassword(password);
        if (!ok) 
            return res.status(400).json({ message: "Invalid credentials" });

        const token = signToken(user._id);
        res.json({
            token, 
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


//   Google OAuth

router.get("/google", 
    passport.authenticate("google", { 
        scope: ["profile", "email"], 
        session: false 
    })
);

router.get("/google/callback",
    passport.authenticate("google", { 
        session: false, 
        failureRedirect: `${process.env.CLIENT_URL}/login?error=1` 
    }),
    (req, res) => {
        const token = signToken(req.user._id);
        res.redirect(`${process.env.CLIENT_URL}/auth/callback?token=${token}`);
    }
);

//  Me (tokenn-ის შემოწმება)

router.get("/me", protect, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;