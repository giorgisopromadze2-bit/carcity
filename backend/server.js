const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const carRoutes = require("./routes/carRoutes");
const configRoutes = require("./routes/configRoutes");
const uploadRouter = require("./routes/upload");

const app = express();

app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

app.use("/api/cars", carRoutes);
app.use("/api/config", configRoutes);
app.use("/api/upload", uploadRouter);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});

