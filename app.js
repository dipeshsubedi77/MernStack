 require('dotenv').config()
 const express = require('express')
const connectToDatabase = require('./database/Index')
const app = express();

app.use(express.json()); 
  connectToDatabase()



   app.get("/",(req,res)=>{
    res.status(process.env.STATUS).json({
      message:"hello world I am dipesh"
    })
   })

   app.post("/blog", (req, res) => {
    console.log(req.body);
    res.status(200).json({
        message: "Blog is ready",
    });
});


   app.listen(process.env.PORT,()=>{
    console.log('nodejs project started')
   })

