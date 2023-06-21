const cron = require("node-cron");
const nodemailer = require("nodemailer");
const express = require("express");
let bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

// homepage route
app.get("/", (req, res) => {
  return res.send({
    error: false,
    message: "Welcome to RESTful CRUD API with NodeJS, Express, MYSQL",
  });
});

//Email schedules code comes here
cron.schedule("0 0 0 * * *", () => {
  console.log("runs in every second");
});

// // กำหนดค่าเกี่ยวกับ email ที่จะใช้ส่ง
// let transporter = nodemailer.createTransport({
//   // host: "hotmail",
//   service: "hotmail",
//   auth: {
//     user: "ismat_rr@hotmail.com",
//     pass: "qprfitnmvyrrpklw",
//   },
// });

// // รายละเอียดอีเมล
// transporter.sendMail(
//   {
//     from: "ismat_rr@hotmail.com", // ผู้ส่ง
//     to: "ismatroongruang@gmail.com", // ผู้รับ
//     subject: "สวัสดีจ้า", // หัวข้อ
//     text: "สวัสดีนะ", // ข้อความ
//     html: "<b>สวัสดี</b>ครับ<br> ",
//     // ข้อความ
//   },
//   (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info.messageId);
//     }
//   }
// );

app.listen(port, () => {
  console.log(`Node App is running on port ${port}`);
});

module.exports = app;
