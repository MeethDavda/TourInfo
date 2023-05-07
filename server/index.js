import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter);

const MONGO_URL =
  "mongodb+srv://Meeth:Legolego2002@cluster0.l6dizcm.mongodb.net/MERN_2?retryWrites=true&w=majority";

const port = 5000;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server connected to port: ${port}`));
  })
  .catch((error) => console.log(error));
