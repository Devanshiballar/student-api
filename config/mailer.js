// const nodemailer = require('nodemailer');

// const trasporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:"devanshiballar1611@gmail.com",
//         pass:'hlzh hytt ejvd qnsm'
//     }
// })
// const mailFormat = {
//     from:"devanshiballar1611@gmail.com",
//     to:"devanshiballar1611@gmail.com",
//     subject:"check mail",
//     html:"<h1>test mail</h1>",
// }

// console.log(trasporter)
// async function sendData(){
//     await trasporter.sendMail(mailFormat,(err,info)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log("Sent mail");
//         }
//     })
// }
// module.exports = sendData

const nodemailer = require("nodemailer");

const trasporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "devanshiballar1611@gmail.com",
    pass: "hlzh hytt ejvd qnsm",
  },
});

console.log(trasporter);
async function sendData(to, subject, html, otp) {
  const mailFormat = {
    from: "devanshiballar1611@gmail.com",
    to: to,
    subject: subject,
    html: html,
    otp,
  };
  await trasporter.sendMail(mailFormat, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Sent mail");
    }
  });
}
module.exports = sendData;
