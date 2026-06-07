require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const carRoutes = require("./routes/carRoutes");
const configRoutes = require("./routes/configRoutes");
const uploadRouter = require("./routes/upload");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/api/cars", carRoutes);
app.use("/api/config", configRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

