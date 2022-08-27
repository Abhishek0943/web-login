const express = require("express");  //import express
const app = express(); //for call express function
// const bcrypt = require("bcryptjs");
// const sPasswort = async (password) => {
//     const hPassword = await bcrypt.hash(password, 12);
//     const mPassword = await bcrypt.compare(password, hPassword);
//     console.log(hPassword);
//     console.log(mPassword);
// }
// sPasswort("abhi");

const path = require("path"); //import path module


const hbs = require("hbs");// import hbs module

// app.listen(5000)
const port = process.env.PORT || 3000;  // tell what is port number

// require("./db/conn");  //import conn file which is connect your code to detabase
const Register = require('./models/registers');  // import register data form registers file

const static_path = path.join(__dirname, "../public");
const tamplates = path.join(__dirname, "../tamplates/views");
const partials = path.join(__dirname, "../tamplates/partials");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/registartion", {
    useNewUrlParser: true,
    // useunifiedTropology: true,
    // useCreateIndex: true
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");  // set up for view engine 
app.set("views", tamplates);  // tell the views folder with in the tamplates 
hbs.registerPartials(partials) // tell the hbs component stored in partials folder

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/register", (req , res) => {
    res.render("register");
})
app.post("/register", async(req, res) => {
  try {
      const password = req.body.password;
      const cPassword = req.body.cPassword;
      if (password === cPassword) {
          const registerEmployee = new Register({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            gender:req.body.gender,
            number:req.body.number,
            password:req.body.password,
            cPassword:req.body.cPassword
          })
          
         const registered = await registerEmployee.save();
          res.status(201).render("index")
      } else {
        res.send('password is not matching')
      }
  } catch (error) {
      res.status(400).send(error);
  }
})


app.get("/login", (req, res) => {
    res.render("login");
})
app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userEmail = await Register.findOne({ email: email });
        if (userEmail.password === password) {
            res.status(201).render('index');
        } else {
            res.send("password is not match")
        }
        


    } catch (error) {
        res.status(400).send('invalid email')
    }
})





app.listen(port, ()=> {
    console.log(`every thing is right port number is ${port} avery thing is right`);
})