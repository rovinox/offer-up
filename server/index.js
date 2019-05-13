const dotenv = require("dotenv").config()
const express = require("express")
const massive = require("massive")
const session = require("express-session")
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');
const app = express()
const Ac = require("./controller/authController")
const An = require("./controller/AuthNodeMailer")
const stripe = require("stripe")(process.env.STRIPESECRET_KEY)
const cors = require("cors")
const path = require('path');

// const {uploadFile} = require("react-s3")
app.use(express.json())

app.use(cors())
const {SERVER_PORT, CONNECTING_STRING, SECRET} = process.env


massive(CONNECTING_STRING).then(db => {
    app.set("db", db)
    console.log("Database Connected");
}).catch(err => console.log(err))

app.use(session({
    secret:SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*24
    }

}))




AWS.config.update({
    accessKeyId:process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_KEY
  });
  
  // configure AWS to work with promises
  AWS.config.setPromisesDependency(bluebird);
  
  // create S3 instance
  const s3 = new AWS.S3();
  
  // abstracts function to upload a file returning a promise
  const uploadFile = (buffer, name, type) => {
    const params = {
      ACL: 'public-read',
      Body: buffer,
      Bucket:process.env.BUCKET_S3,
      ContentType: type.mime,
      Key: `${name}.${type.ext}`
    };
    return s3.upload(params).promise();
  };
  
  // Define POST route
  app.post('/test-upload', (request, response) => {
    
    const form = new multiparty.Form();
      form.parse(request, async (error, fields, files) => {
        if (error) throw new Error(error);
        try {
          const path = files.file[0].path;
          const buffer = fs.readFileSync(path);
          const type = fileType(buffer);
          const timestamp = Date.now().toString();
          const fileName = `bucketFolder/${timestamp}-lg`;
          const data = await uploadFile(buffer, fileName, type);
          return response.status(200).send(data);
        } catch (error) {
          return response.status(400).send(error);
        }
      });
  });
  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.post("/api/signup", Ac.signupUser)
app.post("/api/login", Ac.login)
app.post("/api/sell", Ac.addItem)
app.get("/api/getitems", Ac.getItems)
app.get("/api/getitem/:id", Ac.getItem)
app.get("/api/checkuser", Ac.checkUser)
app.get("/api/logout", Ac.logout)
app.get("/api/search/:item", Ac.searchedItems)
app.get("/api/getpost", Ac.getPost)
app.post("/api/changeprice/:item_id/:price", Ac.changePrice)
app.delete("/api/delete/:id", Ac.deleteItem  )
app.get("/api/getseller/:id", Ac.getSaller)
app.put("/api/profilePic", Ac.changePicture)
app.post("/api/email", An.addContactForm)
app.post("/api/checkout", async (req, res) =>{
  let error;
  let status;
  try{
    const {token, item} =req.body
    const customer = await stripe.customers.create({
      email:token.email,
      source:token.id
    })
    
    const charge = await stripe.charges.create({
      amount : item.price*100,
      currency:"usd",
      customer:customer.id,
      receipt_email:token.email,
      description:item.name,
      shipping:{
        name:token.card.name,
        address:{
          line1:token.card.address_line1,
          city:token.card.address_city,
          country:token.card.address_country,
          postal_code: token.card.address_zip
        }
      }


    })
    
    console.log("charge", {charge});
    status="success"
  } catch(error){
    console.error("error", error);
    status="failure"
  }

  res.json({error,status})
})






app.listen(SERVER_PORT, ()=> console.log(`linting on ${SERVER_PORT}`))