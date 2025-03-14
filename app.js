 require('dotenv').config()
 const express = require('express')
const connectToDatabase = require('./database/Index');
const Blog = require('./database/model/blogModel');
const app = express();

app.use(express.json()); 
  connectToDatabase()



   app.get("/",(req,res)=>{
    res.status(process.env.STATUS).json({
      message:"hello world I am dipesh"
    })
   })

   app.post("/blog", async (req, res) => {
    const{title,description,subtitle,image} = req.body

    await Blog.create({

      title: title,
      description : description,
      image: image,
      subtitle: subtitle

    })
    res.status(200).json({
        message: "Blog is ready",
    });
});


   app.listen(process.env.PORT,()=>{
    console.log('nodejs project started')
   })

