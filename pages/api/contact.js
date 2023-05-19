// eslint-disable-next-line import/no-anonymous-default-export
export default function (req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: "velobos.ik26@yandex.ru",
      pass: "fvepvxrjabcuflqd",
      // user: "a.egorovaaaaaa@yandex.ru",
      // pass: "gqzbcvexwksxdkmk",
    }
  });

  const mailData = {
    from: "velobos.ik26@yandex.ru",
    to: "velobos.ik26@yandex.com",
    subject: `Message From ${req.body.name}`,
    text: req.body.message + " | Sent from: " + req.body.email,
    html: Object.values(req.body.allAnswers).reduce(
      (acc, answer) =>
        acc +
        ` <div>${answer.question} <br/> ${answer.answer}</div> <br/> `,
      [`<div>${req.body.message}</div><p>Sent from: ${req.body.email}</p>`]
    ),
  };


  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });

  console.log(req.body);
  res.send("success");
}
