const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');

var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('connection established');
    else
        console.log("there is error");
});

var nameSchema = new mongoose.Schema({
    name:String,
    email:String,
    mobile:String,
    city:String

});

var employee=mongoose.model("employees",nameSchema);





app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','form.html'));
});

app.post("/addname", (req, res) => {
    var myData = new employee(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});



app.listen(3200,(req,res)=>{
    console.log("server connected");
});