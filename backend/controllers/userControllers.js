import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email and password");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 5);
  const user = await User.create({ name, email, password: hashed });

  res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
};
