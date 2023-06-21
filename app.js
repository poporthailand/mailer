const cron = require("node-cron");
const nodemailer = require("nodemailer");
const express = require("express");
let bodyParser = require("body-parser");
const request = require("request");

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

// app.post("/webhook", (req, res) => res.sendStatus(200));
app.post("/webhook", (req, res) => {
  let reply_token = req.body.events[0].replyToken;
  reply(reply_token);
  res.sendStatus(200);
});

function reply(reply_token) {
  let headers = {
    "Content-Type": "application/json",
    Authorization:
      "+Jluk+0Jh1HKrO4NEmPglPNQTqAXQVw98SsUGs0COxT9aYalPQ4FoV+j8bM1j2GvTnLIRcD3LgD9kio3B8LIeFBN3G4zB8HPTmEWJWJtgBU7zQigXVDfbbGGASiZquhax4lsD0afXOy2HMleH3LZ0wdB04t89/1O/w1cDnyilFU=",
  };
  let body = JSON.stringify({
    replyToken: reply_token,
    messages: [
      {
        type: "text",
        text: "Hello",
      },
      {
        type: "text",
        text: "How are you?",
      },
    ],
  });
  request.post(
    {
      url: "https://api.line.me/v2/bot/message/reply",
      headers: headers,
      body: body,
    },
    (err, res, body) => {
      console.log("status = " + res.statusCode);
    }
  );
}

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
