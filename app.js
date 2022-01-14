const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoute = require("./routes/api");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://pndjay:movesharp@cluster0.e8npv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
    {useNewUrlParser: true,})
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
    res.json({"message": "Server is running!"});
});

app.use("/api", apiRoute)

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
