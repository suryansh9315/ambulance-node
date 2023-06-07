const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const { SERVER_ERR, API_ENDPOINT_NOT_FOUND_ERR } = require("./error");
const CONFIG = require("./config");
const userRoutes = require("./routes/UserRouter");

dotenv.config();
const app = express();
const uri = process.env.MONGODB_URI;
app.use(express.json())

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', error => console.log(error) );

app.use("/api/user", userRoutes);

app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});

app.listen(3000, () => console.log("Server is running..."));
