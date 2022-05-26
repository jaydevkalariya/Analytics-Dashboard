const mysql=require('mysql');
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));

const connection=mysql.createConnection(
    {
        host: 'localhost',
        database:'registration_formm',
        user: 'root',
        password:''
    }
);
connection.connect(function(err){
    if(err){
        console.log("error occured while connecting");
        throw err;
    }
    else
    {
        console.log("conncetion created with mysql succesufully");
    }
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/login.html");
});
app.post("/", function(req, res){
     var email=req.body.email;
     var password=req.body.password;
     sql="SELECT * FROM `registration` WHERE `email` LIKE '"+ email +"' AND `password` LIKE '"+ password +"'";
    connection.query(sql,
    function(err,result,fields)
        {
            if(result.length>0)
            {
                res.send(
                    "<script> alert('login succesufully');window.location.href='/welcome'; </script>");
            }
            else
            {   
                res.send(
                    "<script> alert('not found');window.location.href='/'; </script>");
            }
        });
});
app.get("/welcome", function(req, res){
    res.sendFile(__dirname + "/welcome.html");
});
app.listen(4000);