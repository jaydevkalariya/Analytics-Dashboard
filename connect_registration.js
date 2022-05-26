const mysql=require('mysql');
const express=require('express');
const app=express();
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("_dirname + '/public'"));
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
        console.log("connection created with mysql succesufully");
    }
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/registration_form.html");
});

app.post("/", function(req, res){
      namee=req.body.namee;
      email=req.body.email;
      password=req.body.password;
      contact=req.body.contact;
    
     sql2="SELECT * FROM `registration` WHERE `email` LIKE '"+email+"'";
     connection.query(sql2,
        function(err,result2,fields)
            {
                if(!err && result2.length==0)
                {
                    console.log("inserted succesfully");
                    sql="INSERT INTO `registration` ( `name`, `email`,`password`,`contactNo`) VALUES (?)";
                    values=[namee,email,password,contact];
                    connection.query(sql,[values],
                        function(err,result,fields)
                            {
                                if(!err)
                                {
                                    res.send(
                                    "<script> alert('inserted succesufully');window.location.href='http://localhost:4000/'; </script>");
          
                                }
                                else
                                {    throw err;
                                }
                            });
                }
                else if(result2.length!=0)
                {  
                    res.send(
                        "<script> alert('already registered');window.location.href='/'; </script>");
                }
                else
                throw err;
            });
   
});
app.get("/", function(req, res){
    res.sendFile(__dirname + "/validation_red.js");
});
app.listen(4500);

