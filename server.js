const express = require("express");
const app = express();
require("dotenv").config();
const taskRoutes = require("./routes/taskRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  //log out my requests
  next();
});

app.use(express.json()); //access to request.body

//routes
app.use("/api/tasks", taskRoutes);

app.use(cors("https://taskmanager-04c5.onrender.com"));
//mongoose-connect to db

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //only listen for request once mongoose is connected to DB
    app.listen(process.env.PORT, () => {
      console.log("listening on 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
