const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
// ADD THIS
var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//  define routes
app.use("/api/auth",require('./routes/auth'));
app.use("/api/contacts",require("./routes/contacts"));

const PORT = process.env.PORT || 8000
mongoose.connect("mongodb://127.0.0.1:27017/contact-list",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));
})
.catch((error)=>console.log('Error in connecting database',error.message));
