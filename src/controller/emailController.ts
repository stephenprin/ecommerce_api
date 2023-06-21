import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';

interface EmailData {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const sendEmail = expressAsyncHandler(async (req: Request, res: Response) => {
  const data: EmailData = req.body as EmailData;

  try {
    await sendEmailWithArguments(data);
    res.send("Email sent"); // Send a response to the client if needed
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email"); // Send an error response to the client if needed
  }
});

const sendEmailWithArguments = async (data: EmailData) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_ID as string,
      pass: process.env.GOOGLE_PASSWORD as string,
    },
  });

  let info = await transporter.sendMail({
    from: '"Hey 👻" <abc@example.com>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export { sendEmail, sendEmailWithArguments };
