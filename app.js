const express=require("express");
const path=require("path");
const port=80;
const app=express()
const bodyparse=require('body-parser')
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/Contact',{useNewUrlParser:true});

//schema
const contactSchema = new mongoose.Schema({
    name: String,
    age:String,
    gender:String,
    email:String,
    phonenumber:String,
    address:String,
  });
// model for schema
const contact = mongoose.model('contact', contactSchema);

//static stuff
app.use('/static',express.static('static')) 
app.use(express.urlencoded())
//pug stuff
app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'pug') 

app.get('/',(req,res)=>{
    res.render('index.pug');
}); 

app.get('/contact',(req,res)=>{
    res.render('contact.pug')
});

app.get('/about',(req,res)=>{
    res.render('about.pug')
});

app.post('/contact',(req,res)=>{
    var mydta=new contact(req.body);  //save data in mongodb
    mydta.save().then(()=>{
        res.send("your data has been saved succesfully to db")
    }).catch(()=>{
        res.send("your data was not saved to db")
    })
    console.log(req.body)

})


app.listen(80,()=>{
    console.log(`the server is sucessfully running at port ${port}`);
});