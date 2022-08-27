const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const employeeSchema = new mongoose.Schema({
    firstname: {
        type : String,
        required :true
    },
    lastname: {
        type : String,
        required :true
    },
    email: {
        type : String,
        required: true,
        unique :true
    },
    gender: {
        type : String,
        required :true
    },
    number: {
        type : Number,
        required: true,
        unique: true
    },
    
    password: {
        type : String,
        required :true
    },
    cPassword: {
        type : String,
        required :true
    }
})
// console.log(this.password)
// employeeSchema.pre("save", async function (next) {
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(password, 12);
//         console.log(this.password);
//     }
//     next();
// });


const Register = new mongoose.model("Register", employeeSchema);
module.exports = Register;