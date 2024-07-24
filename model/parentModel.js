const { Schema, model, default: mongoose } = require("mongoose");

const schemaFormat = {
  type: String,
  required: true,
  trim: true,
};

const ParentSchema = Schema(
  {
    std_id: {
      type: mongoose.Types.ObjectId,
      ref: "Student",
    },
    father_name: {
      ...schemaFormat,
    },
    mother_name: {
      ...schemaFormat,
    },
    parent_number: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Parent = model("Parent", ParentSchema);
module.exports = Parent;
