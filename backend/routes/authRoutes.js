import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "../models/Student.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// ✅ Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    const exist = await Student.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      course,
    });

    await student.save();
    res.json({ msg: "Registered Successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});


// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email });
  if (!student) return res.status(400).json({ msg: "Invalid email" });

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign(
    { id: student._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token, student });
});


// ✅ Update Password
router.put("/update-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const student = await Student.findById(req.user.id);

  const isMatch = await bcrypt.compare(oldPassword, student.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong old password" });

  student.password = await bcrypt.hash(newPassword, 10);
  await student.save();

  res.json({ msg: "Password updated" });
});


// ✅ Update Course
router.put("/update-course", authMiddleware, async (req, res) => {
  const { course } = req.body;

  await Student.findByIdAndUpdate(req.user.id, { course });

  res.json({ msg: "Course updated" });
});

export default router;