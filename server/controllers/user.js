import mongoose from "mongoose";
import userModel from "../models/user.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "jwtToken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });
    if (!oldUser)
      return res.status(400).json({ message: "user does not exist" });

    const isPasswordCorrect = await bycrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({ message: "signUp went wrong" });
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  const { email, password, fname, lname } = req.body;

  try {
    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const hashedPwd = await bycrypt.hash(password, 12);

    const result = await userModel.create({
      email,
      password: hashedPwd,
      name: `${fname} ${lname}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "signUp went wrong" });
    console.log(error);
  }
};
