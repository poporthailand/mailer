const cron = require("node-cron");
const nodemailer = require("nodemailer");

const express = require("express");
let bodyParser = require("body-parser");

const request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const line = require("@line/bot-sdk");
const config = {
  channelAccessToken:
    "dVC22ONSrvqP8Hi9iX+jzyP93GnR+sbHpcl7mv5VlituS0Pfi03qegoU6cbXexfK+rCDkTwC4m/6DdGi8X/uJFzOnl7eAGZWL99bFNPBjrWnKdJQAv/6xPMf1FQhqk0VscpCKLyMm+QhUBTYzz9ADwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "707dcba9b9fd0350d53aa2549ded3174",
};
const client = new line.Client(config);

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

// app.post("/webhook", (req, res) => {
//   // let reply_token = req.body.events[0].replyToken;
//   // reply(reply_token);
//   const client = new line.Client({
//     channelAccessToken: "<channel access token>",
//   });
//   res.sendStatus(200);
// });

app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) =>
    res.json(result)
  );
});

function handleEvent(event) {
  console.log(event);
  if (event.type === "message" && event.message.type === "text") {
    handleMessageEvent(event);
  } else {
    return Promise.resolve(null);
  }
}

function handleMessageEvent(event) {
  var msg = {
    type: "text",
    text: "สวัสดีครัช",
  };

  return client.replyMessage(event.replyToken, msg);
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
