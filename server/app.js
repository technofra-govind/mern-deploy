const express = require("express")
const mongoose = require("mongoose")
const app = express();
const cors = require("cors")
require("dotenv").config();

// middleware
const corOptions = {
    origin:"https://fabulous-axolotl-00b892.netlify.app/"
}
app.use(express.json())
app.use(cors())


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