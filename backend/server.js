const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const multer = require('multer');
const path = require('path');
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ticketingsytem',
  });
  



// Ticketing Part -----------------------------------------------------------------------------------------------------------------------------------------------------------
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get("/adminTickets", (req, res) => {
    const sql = "SELECT * FROM issued_tickets;";
    connection.query(sql, (err,data) => {
        if(err)  return res.json('Error: ' + err.message);
         return res.json(data);
    })
})

app.listen(3001, () => {
    console.log("listening");
})

let transporter = nodemailer.createTransport({
service: "gmail",
    auth: {
         user: "prospectissuedticket@gmail.com",
       pass: "mqqbblfvqbrezdfx"
        },
     tls :{
         rejectUnauthorized: false
     },
 })

 let mailOptions = {
     form: "prospectissuedticket@gmail.com",
   to: "anmol.bhangoo2002@gmail.com",
     subject: "Ticket",
     text: "Your Ticket Has been Issued!"
 }

 const sendEmail = function() {
    transporter.sendMail(mailOptions , function(err, succ){
     if(err){
         console.log(err)
     }
          else{
         console.log("Email Sent")
     }
 })
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads' )
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


app.use(express.json());
app.post('/createTicket', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO ticketingsytem.issued_tickets (TICKET_DATE, TICKET_SUBJECT, TICKET_CATEGORY, TICKET_DESCRIPTION, TICKET_PRIORITY, TICKET_STATUS, TICKET_PIC)  VALUES (?);"
    let filename = "";
    if (req.file) {
        filename = req.file.filename;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const values = [
        formattedDate,
        req.body.subject,
        req.body.category,
        req.body.description,
        req.body.priority,
        "NotSolved",
        filename
    ];
    console.log(req.body.subject);
    console.log(req.file);
    connection.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        else 
        sendEmail();
        return res.json(data);
    })
})

// Ticketing Parts End ------------------------------------------------------------------------------------------------------------------------------------------------------






// Booking Part  ------------------------------------------------------------------------------------------------------------------------------------------------------


app.get("/requests", (req, res) => {
    connection.query("SELECT * FROM createbooking", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  
  app.post("/booking", (req, res) => {
    // const message = "The selected time slot conflicts with an existing booking.";
    const sql =
      "INSERT INTO createbooking (roomID, name, noOfGuest, bookingDate, startTime, totalHours, enquiry, endTime) VALUES (?)";
  
    const startTime = req.body.time; // Assuming req.body.time is a valid time string
    const totalHours = req.body.totalHours;
  
    // Convert the startTime to minutes
    const startTimeInMinutes =
      parseInt(startTime.slice(0, 2)) * 60 + parseInt(startTime.slice(3));
  
    // Calculate the endTime by adding totalHours to startTime
    const endTimeInMinutes = startTimeInMinutes + totalHours * 60;
  
    // Adjust the endTime if it exceeds 24 hours
    const adjustedEndTimeInMinutes = endTimeInMinutes % (24 * 60);
  
    // Format the endTime as HH:mm
    const endTime = `${Math.floor(adjustedEndTimeInMinutes / 60)
      .toString()
      .padStart(2, "0")}:${(adjustedEndTimeInMinutes % 60)
      .toString()
      .padStart(2, "0")}`;
  
    const newStartTime = startTimeInMinutes;
    const newEndTime = adjustedEndTimeInMinutes;
  
    const roomID = req.body.roomID;
    const bookingDate = req.body.date;
  
    // Check if the same roomID is booked at the same date during the selected time slot
    const selectSql =
      "SELECT * FROM createbooking WHERE roomID = ? AND bookingDate = ?";
      connection.query(selectSql, [roomID, bookingDate], (selectErr, bookingData) => {
      if (selectErr) {
        return res.json("Error");
      }
  
      const hasConflict = bookingData.some((booking) => {
        const existingStartTime =
          parseInt(booking.startTime.slice(0, 2)) * 60 +
          parseInt(booking.startTime.slice(3));
        const existingEndTime =
          parseInt(booking.endTime.slice(0, 2)) * 60 +
          parseInt(booking.endTime.slice(3));
  
        if (
          (newStartTime >= existingStartTime && newStartTime < existingEndTime) ||
          (newEndTime > existingStartTime && newEndTime <= existingEndTime)
        ) {
          return true;
        }
        return false;
      });
  
      if (hasConflict) {
        // Return the alert message to the user
        return res.send(
          '<script>alert("The selected time slot conflicts with an existing booking."); window.location.href = "/";</script>'
        );
      }
  
      const values = [
        roomID,
        req.body.name,
        req.body.noOfGuest,
        bookingDate,
        req.body.time,
        req.body.totalHours,
        req.body.enquiry,
        endTime,
      ];
  
      connection.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
      });
    });
  });
  
  app.put("/update",(req,res) => {
    const id = req.body.id;
    const roomID = req.body.roomID;
    const name = req.body.name;
    const noOfGuest = req.body.noOfGuest;
    const bookingDate = req.body.bookingDate;
    const startTime = req.body.startTime;
    const totalHours = req.body.totalHours;
    const enquiry = req.body.enquiry;
    const endTime = req.body.endTime;
  
    connection.query('UPDATE createBooking SET roomID=?, name=?, noOfGuest=?, bookingDate=?, startTime=?, totalHours=?, enquiry=?, endTime=? WHERE id=?', [roomID, name, noOfGuest, bookingDate, startTime
    , totalHours, enquiry, endTime, id],
      (err,result) => {
        if(err){
          console.log(err);
          res.status(500).send('There have been an error while updating the current booking room request');
        }else{
          console.log(result);
          res.send(result);
        }
      }
    );
  });
  
  app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
  
    connection.query("DELETE FROM createbooking WHERE id=?", id, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("There is an error deleting this request");
      } else {
        console.log(result);
        res.send(result);
      }
    });
  });


 // Booking Part Ending -----------------------------------------------------------------------------------------------------------------------------------
  

 

 // Admin Part --------------------------------------------------------------------------------------------------------------------------------------------
 
// defined a route handler for the root path "/" of the server. when get request is made to the root path. the provided
// callback function is executed
app.get('/', async (req, res) => {
  res.status(200).send("Main Backend Route");
});

// Routers - imports the user and admin from their respective files
const userRouter = require('./user');
const adminRouter = require('./admin');
// add the routers - This mount the routers at their respective base path
app.use('/user', userRouter);
app.use('/admin', adminRouter);

