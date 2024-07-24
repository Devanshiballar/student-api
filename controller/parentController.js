const ParentModel = require("../model/parentModel");


exports.create = async (req, res) => {
  try {
    const { std_id, father_name, mother_name, parent_number } = req.body;
  

    const Parent= await ParentModel.create({
        std_id,
        father_name,
        mother_name,
        parent_number
    });
    if (Parent) {
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
    const Parent = await ParentModel.find().populate('std_id').exec();
    if (Parent) {
        res.json({Parent})
      
    } else {
        res.json("no data ")
    
    }
  } catch (error) {
    console.log(error);
  }
};
// exports.trash = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const student = await studentModel.findByIdAndDelete({ _id: id });
//     if (student) {
//       res.status(200).json({
//         success: true,
//         message: "data are deleted",
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "no id found",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// exports.update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const Student = await studentModel.findByIdAndUpdate(
//       { _id: id },
//       {
//         std_name: req.body.std_name,
//         std_gmail: req.body.std_gmail,
//         std_mobile: req.body.std_mobile,
//         std_GIRD: req.body.std_GIRD,
//         std_profile: req?.file?.filename,
//       }
//     );
//     if (Student) {
//       res.status(200).json({
//         success: true,
//         message: "data are inserted",
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: "id not found ",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
