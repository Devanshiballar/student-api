const jwt = require("jsonwebtoken");
const sendData = require("../config/mailer");
const studentModel = require("../model/studentModel");
const crypto = require("crypto");
const { FogetFormat } = require("../utils/forgetpass");

exports.create = async (req, res) => {
  try {
    const { std_name, std_gmail, std_mobile, std_GIRD } = req.body;
    const std_profile = req?.file?.filename;

    const Student = await studentModel.create({
      std_name,
      std_gmail,
      std_mobile,
      std_GIRD,
      std_profile,
    });
    if (Student) {
      res.status(200).json({
        success: true,
        message: "data are inserted",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "data are not inserted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.index = async (req, res) => {
  try {
    const Student = await studentModel.find({}, { __v: 0 });
    if (Student) {
      res.status(200).json({
        Student,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "no data found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.trash = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByIdAndDelete({ _id: id });
    if (student) {
      res.status(200).json({
        success: true,
        message: "data are deleted",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "no id found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const Student = await studentModel.findByIdAndUpdate(
      { _id: id },
      {
        std_name: req.body.std_name,
        std_gmail: req.body.std_gmail,
        std_mobile: req.body.std_mobile,
        std_GIRD: req.body.std_GIRD,
        std_profile: req?.file?.filename,
      }
    );
    if (Student) {
      res.status(200).json({
        success: true,
        message: "data are inserted",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "id not found ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//mailler controller

exports.forget = async (req, res) => {
  console.log("send mail");
  await sendData();
  res.json("send mail");
};

exports.sendOtp = async (req, res) => {
  try {
    function generatOtp(length = 4) {
      const otp = crypto.randomInt(0, Math.pow(10, length)).toString();
      return otp.padStart(length, "0");
    }
    const { std_gmail } = req.body;
    const existUser = await studentModel.findOne({ std_gmail: std_gmail });
    console.log(existUser);
    if (!existUser) {
      res.json({ message: "user not found" });
    }
    const otp = generatOtp();
    const updateUser = await studentModel.findByIdAndUpdate(
      { _id: existUser._id },
      {
        token: otp,
      },
      { new: true }
    );
    if (updateUser) {
      sendData(
        existUser.std_gmail,
        "forget password",
        FogetFormat(existUser.std_name, otp)
      );
      res.json("send mail");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.changeUser = async (req, res) => {
  try {
    const { std_gmail, otp, newUser } = req.body;
    const existUser = await studentModel.findOne({ std_gmail: std_gmail });
    if (!existUser) {
      res.json("email id not exist");
    }
    if (otp !== existUser.token) {
      res.json("otp is not valid");
    } else {
      const updateUser = await studentModel.findByIdAndUpdate(
        { _id: existUser._id },
        {
          token: "",
          std_name: newUser,
        }
      );
      if (updateUser) {
        res.json("user is updated");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// exports.login = async (req, res) => {
//   try {
//     const mail = req.body;
//     console.log(req.body);
//     const std = await studentModel.findOne({ std_gmail: mail });
//     if (!std) {
//       res.json("user  not found");
//     } else {
//       res.json("login");
//     }

//     const token = jwt.Sign(
//       {
//         stdId: std._id,
//         stdRole: std.role_id,
//       },
//       "devanshi16",
//       { expiresIn: "1h" }
//     );
//     res.header("token", token).json({
//       success: true,
//       message: "login successful!",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
exports.login = async (req, res) => {
  try {
    const { std_gmail } = req.body; // Extract the email from the request body
    console.log(req.body);

    if (!std_gmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const std = await studentModel.findOne({ std_gmail: std_gmail });

    if (!std) {
      res.status(404).json({ message: "User not found" });
    }
    const token = jwt.sign(
      {
        stdId: std._id,
        stdRole: std.role_id,
      },
      "devanshi16",
      { expiresIn: "1h" }
    );
    res.header("token", token).json({
      success: true,
      message: "login successful!",
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred during login", details: err.message });
  }
};
