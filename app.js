 require('dotenv').config()
 const express = require('express')
const connectToDatabase = require('./database/Index');
const Blog = require('./database/model/blogModel');
const app = express();



const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage:storage})



const fs = require('fs')

// file upload haru/..........



app.use(express.json()); 
  connectToDatabase()



   app.get("/",(req,res)=>{
    res.status(process.env.STATUS).json({
      message:"hello world I am dipesh"
    })
   })

   app.post("/blog",upload.single('image') , async(req, res) => {

    console.log(req.body)
    console.log(req.file)
    const{title,description,subtitle} = req.body

    const fileName = req.file.filename 
    if(!title || !subtitle|| !description){
      return res.status(400).json(
        {
          message:"please provide title,subtitle,description"
        }
      )
    }
   
    // if we sont do return it will print downward code too!!

    await Blog.create({

      title: title,
      description : description,
      
      subtitle: subtitle,
      image: fileName

    })
    res.status(200).json({
        message: "Blog is ready",
    });
});

app.get("/blog", async(req,res)=>{
const blogs  = await Blog.find()//RETURN OBJ

res.status(200).json({
  message:"blogs fetched sucessfully",
  data: blogs
})
// if anyone intrested to see to file image so they can
app.use(express.static('./storage'))

})


   app.listen(process.env.PORT,()=>{
    console.log('nodejs project started')
   })

// to get a blog id 
   app.get("/blog/:id",async (req,res)=>{

    
    const id = req.params.id
    const blogging = await Blog.findById(id)//mongodb function

//  if object id is in array we should do blogging.length == 0
    if(!blogging){
      return res.status(404).json({
        message:"no data found"
      })


    }

    res.status(200).json({
      message:"fetched sucessfully",
      data: blogging
    })
   })
//  to delete blog



app.delete("/blog/:id", async (req, res) => {
  const id = req.params.id;

  // ✅ Await the findById query to get the document
  const bloge = await Blog.findById(id);

  if (!bloge) {
     return res.status(404).json({ message: "Blog not found" });
  }

  const imageFrom = bloge.image; // ✅ Now imageFrom will have a valid value

  await Blog.findByIdAndDelete(id);

  const fs = require("fs");

  // ✅ Fix: Ensure the file exists before trying to delete
  fs.unlink(`./storage/${imageFrom}`, (err) => {
     if (err) {
        console.log("Error deleting file:", err);
     } else {
        console.log("Blog deleted successfully");
     }
  });

  res.status(200).json({
     message: "Deleted successfully",
  });
});
//  to update a blog content
app.patch("/blog/:id", upload.single("image"),async (req,res)=>{
  const id =  req.params.id


  const {title,subtitle,description} = req.body
  let imageName;

  if(req.file){
    imageName = req.file.filename;
    const bloge = await Blog.findById(id);
    const imageFrom = bloge.image;

    fs.unlink(`./storage/${imageFrom}`, (err) => {
      if (err) {
         console.log("Error deleting file:", err);
      } else {
         console.log("Blog deleted successfully");
      }
   });

  }
   await Blog.findByIdAndUpdate(id,{
    title:title,
    subtitle:subtitle,
    description:description,
    image : imageName
  })

  res.status(200).json({
    message: "updated sucessfully",
 });
})
