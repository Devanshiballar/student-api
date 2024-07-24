const { Schema, model } = require("mongoose");

const schemaFormat = {
  type: String,
  required: true,
  trim: true,
};

const studentSchema = Schema(
  {
    std_name: {
      ...schemaFormat,
    },
    std_gmail: {
      ...schemaFormat,
      unique: true,
    },
    std_mobile: {
      ...schemaFormat,
      unique: true,
    },
    std_GIRD: {
      ...schemaFormat,
    },
    std_profile: {
      ...schemaFormat,
      required: false,
    },
    role_id: {
      type: "string",
      default: 0,
      enum: [0, 1, 2, 3],
    },
    token: {
      ...schemaFormat,
      required: false,
    },
  },
  { timestamps: true }
);

const Student = model("Student", studentSchema);
module.exports = Student;
