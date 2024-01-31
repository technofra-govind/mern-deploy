const express = require("express")
const mongoose = require("mongoose")
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require("cors")
require("dotenv").config();

// middleware
const corOptions = {
    origin:"https://dashing-meerkat-8d0123.netlify.app"
}
app.use(cors(corOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// app.use(express.json()) 
// app.use(cors())
// Connect mongoDB
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    const PORT = process.env.PORT || 8000
    app.listen(PORT,()=>{
        console.log(`App is Listening on PORT ${PORT}`)
    })
}).catch(err=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    res.status(201).json({message:"Connected to backend successfully !"})
})

app.post('/submit-form', cors(corOptions), async (req, res) => {
    const { firstname, lastname, number, email, message } = req.body;
  
    try {
      // Send email to website owner
      const ownerEmail = 'govind@technofra.com'; // Replace with your email
      await sendEmail(ownerEmail, 'New Form Submission', `Name: ${firstname} ${lastname}\nPhone: ${number}\nEmail: ${email}\nMessage: ${message}`);
  
      // Send thank-you email to the user
      await sendEmail(email, 'Thank You for Your Submission', 'Thank you for submitting the form. We will get back to you soon.');
  
      res.status(200).send('Form submitted successfully.');
    } catch (error) {
      console.error('Error processing form submission:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  async function sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'govind@technofra.com',
        pass: 'Mumbai#1021',
      },
    });
  
    const mailOptions = {
      from: 'support@technofra.com',
      to,
      subject,
      text,
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          reject(error);
        } else {
          console.log('Email sent: ' + info.response);
          resolve(info);
        }
      });
    });
  }
