require('dotenv').config();
const express = require("express");
const { open } = require("sqlite");
const cors = require('cors')
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const databasePath = path.join(__dirname, "userDetails.db");

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from your frontend
}));

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });

    /*await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        otp TEXT,
        otpExpiry INTEGER
      )
    `);*/

    app.listen(3300, () => {
      console.log("Server is running at http://localhost:3300");
    });
  } catch (error) {
    console.log(`db error ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

/*app.get("/user", async (request, response)=>{
  const getUser = `
  select * 
  from users where name ='Akhil'`
  const returnedUser = await db.get(getUser)
  response.send({id:returnedUser.id,
    name:returnedUser.name,
    email:returnedUser.email
})
})
*/


app.post("/login", async (request, response)=>{
  const {email, password} = request.body
  const getUser =  `
  select * from users where email='${email}' and password='${password}'`
  
  const returnedUser = await db.get(getUser)
  
  if (returnedUser!==undefined) {
    response.send(returnedUser)
  }
  else{
    response.status(400)
    response.send("Invalid user details")
  }

})

app.post("/registerUser", async (request, response)=>{
  
  const {name, email, mobileNumber, password} = request.body
  const addUser = `Insert Into users (name, email, mobile, password) values ('${name}', '${email}', '${mobileNumber}', '${password}');`
  const  returned = await db.run(addUser)
  response.send({returned})
})



/* Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'akhilakki1412@gmail.com',
    pass: 'Amazon123',
  },
});

transporter.verify(function(error, success) {
  if (error) {
    console.log("SMTP Connection error:", error);
  } else {
    console.log("SMTP Connection successful. Ready to send emails.");
  }
});

// Route to send OTP
app.post("/api/send-otp", async (request, response) => {
  const { name, email } = request.body;
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

  try {
    // Save user details with OTP and expiry time
    await db.run(`
      INSERT INTO users (name, email, otp, otpExpiry) 
      VALUES (?, ?, ?, ?) 
      ON CONFLICT(email) 
      DO UPDATE SET otp=?, otpExpiry=?
    `, [name, email, otp, otpExpiry, otp, otpExpiry]);

    // Send OTP email
    await transporter.sendMail({
      from: 'akhia1686@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    });

    response.send({ success: true });
  } catch (error) {
    console.error("Error sending OTP:", error);
    response.status(500).send({ success: false, message: "Error sending OTP" });
  }
});

// Route to verify OTP
app.post("/api/verify-otp", async (request, response) => {
  const { email, otp } = request.body;

  try {
    const user = await db.get(`SELECT otp, otpExpiry FROM users WHERE email = ?`, [email]);

    if (!user) {
      return response.status(400).send({ success: false, message: "User not found" });
    }

    if (user.otp !== otp) {
      return response.status(400).send({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.otpExpiry) {
      return response.status(400).send({ success: false, message: "OTP expired" });
    }

    // Clear OTP after successful verification
    await db.run(`UPDATE users SET otp = NULL, otpExpiry = NULL WHERE email = ?`, [email]);

    response.send({ success: true });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    response.status(500).send({ success: false, message: "Error verifying OTP" });
  }
});
*/


module.exports=app; 

