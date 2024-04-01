const express = require("express");
const router = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const readEnvFile = require("dotenv").config();

connectDB();
const app = express();

const port = process.env.PORT || 8000;

/* To convert upcoming request payload into JSON */
app.use(express.json());
app.use("/api/contacts", router);
app.use("/api/users", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log("server running on port");
});
