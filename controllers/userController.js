import asyncHandler from "express-async-handler";
import { prisma } from "../db/prismaInitializer.js";
import { generateToken } from "../utils/generateToken.js";
import { comparePassword, encodePassword } from "../utils/encodePassword.js";

export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const exisitingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exisitingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await encodePassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (user) {
      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id),
      });
    }
    return res.status(400).json({ message: "Failed to create the user" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const exisitingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!exisitingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await comparePassword(
      password,
      exisitingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      _id: exisitingUser.id,
      name: exisitingUser.name,
      email: exisitingUser.email,
      token: generateToken(exisitingUser.id),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
