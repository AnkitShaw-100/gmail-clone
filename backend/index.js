import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import emailRoutes from "./routes/email.js";
import auth from "./middlewares/auth.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import cors from "cors";
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/emails", auth, emailRoutes);
app.use("/api/auth/", authRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
