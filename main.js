const mysql=require('mysql');
const express=require('express');
const app=express();
app.set('trust proxy',1);
const path=require('path');
const bodyparser=require('body-parser');
var urlencodedparser=bodyparser.urlencoded({extended: false});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("_dirname + '/public'"));
app.set("views",path.join(__dirname));
app.set('view engine','ejs');
const nodemailer = require('nodemailer');
const lib = require("./mail_sent.js");
cookieParser = require('cookie-parser');
app.use(cookieParser());

//database connectivity with mysql
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
app.get("/admin_reg", function(req, res){
    res.sendFile(__dirname + "/admin_registration.html");
});
app.get("/superadmin_reg", function(req, res){
    res.sendFile(__dirname + "/superadmin_registration.html");
});
app.get("/welcome/contact", function(req, res){
    res.sendFile(__dirname + "/contact.html");
});
app.get("/admin/contact", function(req, res){
    res.sendFile(__dirname + "/contact2.html");
});
app.get("/", function(req, res){
    res.sendFile(__dirname + "/validation_red.js");
  });
  
app.get("/login", function(req, res){
    res.sendFile(__dirname + "/login.html");
});

app.get("/welcome", function(req, res){
    let username=req.cookies.username;
    return res.render("welcome",{
        username,
    });
});

app.get("/admin", function(req, res){
    let username=req.cookies.username;
    return res.render("admin_panel",{
        username,
    });
});
app.get("/adminrole", function(req, res){
     res.sendFile(__dirname + "/confirm_admin.html");
});

//to show analysis page with all details(name,email,percentage)
app.get("/welcome/analysis", function(req, res){
    sql="select * from `analysis` where 1";
    connection.query(sql,
        function(err,result3,fields){
           maxx=0,gtotal=0;
            for(i=0;i<result3.length;i++){
                gtotal+=result3[i].percentage;
                if(maxx<result3[i].percentage)
                maxx=result3[i].percentage;
            }
           gtotal=(gtotal)/result3.length;
            email=req.cookies.email;
            namee=req.cookies.username;
            sql="select * from `response` where email like '"+email+"'";
            connection.query(sql,
                function(err,result,fields){
                    if(result.length!=0){
                        data=result.length;
                        score= result[0].marks;
                        total= result[0].total;
                    current=result[0].percentage;
                    return res.render("analysis",{
                        maxx, current,gtotal,data,score,total, email,namee
                    });
                }
                else{
                    data=result.length;
                    current=result.length;
                    return res.render("analysis",{
                        maxx, current, gtotal, data
                    });
                }})   });
            });
    
app.get("/welcome/score", function(req, res){
    email=req.cookies.email;
    sql="select * from `response` where email like '"+email+"'";
    connection.query(sql,
    function(err,result3,fields){
        if(result3.length!=0){
        var data={
            result: `${result3}`,
           };
           data["result"]=result3;
           console.log(data.result[0].marks);
           return res.render("score",{
            username: req.cookies.username,
            data
        });
    }
    else{
        var data={
            result: `${result3}`,
           };
           data["result"]=result3;
        data=data.result.length;
        return res.render("score",{
            username: req.cookies.username,
            data
    })
    }});});

    app.get("/admin/quiz",function(req,res)
    {
        sql3="SELECT * FROM `temp_adminn`"; 
        connection.query(sql3,
       function(err,result3,fields){
                      var data={
                         result: `${result3}`,
                        };
                        data["result"]=result3;
                       res.render('./quiz2',{data});
                  })
                });
                 app.get("/welcome/quiz",function(req,res)
                  {
                    sql3="SELECT * FROM `temp_adminn`"; 
                    connection.query(sql3,
                       function(err,result3,fields){
                    var data={result: `${result3}`,};
                     data["result"]=result3;
                    email = req.cookies.email;
                    sql="select * from `response` where email like '"+email+"'";
                    connection.query(sql,function(err,rlt,fields){ 
                          if(rlt.length!=0)
                            num=1;
                          else
                            num=0;
                          return res.render('./quiz',{
                            data,
                            num
                        });
                     }); }) });
    
sql3="SELECT * FROM `score`"; 
connection.query(sql3,function(err,result3,fields){
    app.get("/welcome/score",function(req,res)
    {
        var data={result: `${result3}`, };
                        data["result"]=result3;
                       res.render('./score',{data});
                  })
    });
 
//registration page
app.post("/", function(req, res){
    namee=req.body.namee;
    email=req.body.email;
    password=req.body.password;
    contact=req.body.contact;
    usertype=req.body.usertype;
   sql2="SELECT * FROM `registration` WHERE `email` LIKE '"+email+"'";
   connection.query(sql2,
      function(err,result2,fields)
          {
              if(!err && result2.length==0)
              {
                  console.log("inserted succesfully");
                  sql="INSERT INTO `registration` ( `name`,`usertype`, `email`,`password`,`contactNo`) VALUES (?)";
                  values=[namee,usertype,email,password,contact];
                  connection.query(sql,[values],
                      function(err,result,fields)
                          {
                              if(!err)
                              {
                                  res.send(
                                  "<script> alert('registered succesufully');window.location.href='http://localhost:4500/login'; </script>");
        
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
//admin registration page
app.post("/admin_reg", function(req, res){
    namee=req.body.namee;
    email=req.body.email;
    password=req.body.password;
    contact=req.body.contact;
    usertype=req.body.usertype;
   sql2="SELECT * FROM `registration` WHERE `email` LIKE '"+email+"'";
   connection.query(sql2,
      function(err,result2,fields)
          {
              if(!err && result2.length==0)
              {
                  console.log("inserted succesfully");
                  sql="INSERT INTO `registration` ( `name`,`usertype`, `email`,`password`,`contactNo`) VALUES (?)";
                  values=[namee,usertype,email,password,contact];
                  connection.query(sql,[values],
                      function(err,result,fields)
                          {
                              if(!err)
                              {
                                  res.send(
                                  "<script> alert('registered succesufully');window.location.href='http://localhost:4500/login'; </script>");
        
                              }
                              else
                              {    throw err;
                              }
                          });
              }
              else if(result2.length!=0)
              {  
                  res.send(
                      "<script> alert('already registered');window.location.href='/admin_reg'; </script>");
              }
              else
              throw err;
          });
 
});
//superadmin registration page
app.post("/superadmin_reg", function(req, res){
    namee=req.body.namee;
    email=req.body.email;
    password=req.body.password;
    contact=req.body.contact;
    usertype=req.body.usertype;
   sql2="SELECT * FROM `registration` WHERE `email` LIKE '"+email+"'";
   connection.query(sql2,
      function(err,result2,fields)
          {
              if(!err && result2.length==0)
              {
                  console.log("inserted succesfully");
                  sql="INSERT INTO `registration` ( `name`,`usertype`, `email`,`password`,`contactNo`) VALUES (?)";
                  values=[namee,usertype,email,password,contact];
                  connection.query(sql,[values],
                      function(err,result,fields)
                          {
                              if(!err)
                              {
                                  res.send(
                                  "<script> alert('registered succesufully');window.location.href='http://localhost:4500/login'; </script>");
        
                              }
                              else
                              {    throw err;
                              }
                          });
              }
              else if(result2.length!=0)
              {  
                  res.send(
                      "<script> alert('already registered');window.location.href='/superadmin_reg'; </script>");
              }
              else
              throw err;
          });
 
});

//login page
app.post("/login", function(req, res){
    var name=req.body.namee;
     var email=req.body.email;
     var password=req.body.password;
      usertype=req.body.usertype;
      res.cookie('type', usertype);
      res.cookie('username', name);
      res.cookie('email', email);
     sql="SELECT * FROM `registration` WHERE `email` LIKE '"+ email +"' AND `password` LIKE '"+ password +"' AND `usertype` LIKE '"+ usertype +"'";
    connection.query(sql,
    function(err,result,fields)
        {
            if(result.length>0)
            {
                if(usertype=="normal user")
                {
                    res.send(
                    `<script> alert('login succesufully');
                    window.location.href='/welcome';
                     </script>`);
                }
                else
                {
                    res.send(
                        `<script> alert('login succesufully');
                        window.location.href='http://localhost:4500/adminrole';
                         </script>`);
                }

            }
            else
            {   
                res.send(
                    "<script> alert('not found');window.location.href='/login'; </script>");
            }
        });
});
//logout
app.post("/logout", function(req, res){
    res.clearCookie('type');
    res.clearCookie('username');
    res.clearCookie('email');
    res.send(
       "<script> alert('logout succesfully.');window.location.href='/login'; </script>");
})
//when admin modify the quiz
app.post("/modify", function(req, res){
    sqll1="DELETE FROM `response` WHERE 1";
    connection.query(sqll1,
   function(err,result2,fields)
       {})
    res.send(
       "<script> window.location.href='/admin'; </script>");
})
//when admin create new quiz
app.post("/createNew", function(req, res){
    sqll1="DELETE FROM `temp_adminn` WHERE 1";
    connection.query(sqll1,
   function(err,result2,fields)
       {})
    sqll1="DELETE FROM `response` WHERE 1";
    connection.query(sqll1,
   function(err,result2,fields)
       {})
    res.send(
       "<script> window.location.href='/admin'; </script>");
})

//to delete questions from databses
app.post("/new", function(req, res){
    if(req.cookies['type']=="superadmin")
    {
    sqll1="DELETE FROM `question_admin` WHERE 1";
    sqll2="DELETE FROM `questions` WHERE 1";
    connection.query(sqll1,
        function(err,result2,fields)
            {})
    connection.query(sqll2,
        function(err,result2,fields)
            {})
            res.send("<script> alert('deleted succesufully');window.location.href='http://localhost:4500/admin'; </script>");
    }
    else
    {
        sqll1="DELETE FROM `temp_adminn` WHERE 1";
         connection.query(sqll1,
        function(err,result2,fields)
            {})
            res.send("<script> alert('deleted succesufully');window.location.href='http://localhost:4500/admin'; </script>");
    }
});

//to add first type(rating) questions
app.post("/first", function(req, res){
    title1=req.body.title;
    option1=req.body.option1;
    option2=req.body.option2;
    sql2="SELECT * FROM `questions` WHERE `question` LIKE '"+title1+"'";
    connection.query(sql2,
       function(err,result2,fields)
           {
               if(!err && result2.length==0)
               {
                   console.log("inserted succesfully");
                   sqli1="INSERT INTO `question_admin` ( `question`,`type`,`option1`,`option2`,`option3`,`option4`,`option5`,`mcq`) VALUES (?)";
                   values11=[title1,"range",option1,option2,0,0,0,0];
                   sql_t1="INSERT INTO `temp_adminn` ( `question`,`type`,`option1`,`option2`,`option3`,`option4`,`option5`,`mcq`) VALUES (?)";
                   valuest1=[title1,"range",option1,option2,0,0,0,0];
                   connection.query(sqli1,[values11],
                       function(err,result,fields){});
                   connection.query(sql_t1,[valuest1],
                       function(err,result,fields){});
                       sql="INSERT INTO `questions` ( `question`, `ans`,`marks`) VALUES (?)";
            for(i=option1;i<=option2;i++){
                   values1=[title1,i,i];
                   connection.query(sql,[values1],
                       function(err,result,fields){});
                   }  
                    res.send("<script> alert('inserted succesufully');history.back(); </script>");     
               }
               else if(result2.length!=0)
               {  
                   res.send(
                       "<script> alert('already registered');history.back(); </script>");
               }
               else
               throw err;
           });
  
});

//to add second type(True-False) questions
app.post("/second", function(req, res){
    title2=req.body.title2;
    option1=req.body.option1;
    option2=req.body.option2;
    mark1=req.body.mark1;
    mark2=req.body.mark2;
    sql2="SELECT * FROM `questions` WHERE `question` LIKE '"+title2+"' and `ans` LIKE '"+option1+"'  or  `question` LIKE '"+title2+"' and `ans` LIKE '"+option2+"'";
    connection.query(sql2,
       function(err,result2,fields)
           {
               if(!err && result2.length==0)
               {
                   console.log("inserted succesfully");
                   sqli2="INSERT INTO `question_admin` ( `question`,`type`,`option1`,`option2`,`option3`,`option4`,`option5`,`mcq`) VALUES (?)";
                   values22=[title2,"TF",option1,option2,0,0,0,0];
                   connection.query(sqli2,[values22],
                       function(err,result,fields){
                           if(err)
                           console.log(err);
                       });
                   sqli2="INSERT INTO `temp_adminn` ( `question`,`type`,`option1`,`option2`,`option3`,`option4`,`option5`,`mcq`) VALUES (?)";
                   values22=[title2,"TF",option1,option2,0,0,0,0];
                   connection.query(sqli2,[values22],
                       function(err,result,fields){
                           if(err)
                           console.log(err);
                       });
                   sql="INSERT INTO `questions` ( `question`, `ans`,`marks`) VALUES (?)";
                   values1=[title2,option1,mark1];           
                   values2=[title2,option2,mark2];     
                   connection.query(sql,[values1],
                       function(err,result,fields){});
                   connection.query(sql,[values2],
                       function(err,result,fields){});
                           res.send("<script> alert('inserted succesufully');history.back(); </script>");
               }
               else if(result2.length!=0)
               {  
                   res.send(
                       "<script> alert('already registered');history.back(); </script>");
               }
               else
               throw err;
           });
  
});

//to add 3rd type(multiple choices) questions
app.post("/third", function(req, res){
 title3=req.body.title3;
 var ob={};
 var ob2={};
    for(var i=0;i<req.body.option.length;i++)
    {
        ob[i]=req.body.option[i];
        ob2[i]=req.body.mark[i];
    }
    ob=JSON.stringify(ob);
    sql="insert into `question_admin`(`question`,`type`,`mcq`) VALUES (?)";
    value=[title3,"mcq",ob];
    connection.query(sql,[value],function(err,result,fields){});
    sql="insert into `temp_adminn`(`question`,`type`,`mcq`) VALUES (?)";
    connection.query(sql,[value],function(err,result,fields){});
    ob=JSON.parse(ob);
         sql="INSERT INTO `questions` ( `question`, `ans`,`marks`) VALUES (?)";
         for(i=0;i<Object.keys(ob).length;i++){
         values=[title3,ob[i],ob2[i]];           
         connection.query(sql,[values],
             function(err,result,fields){});
         }        
            res.send("<script> alert('inserted succesufully');window.location.href='http://localhost:4500/admin'; </script>");
            });
  

//to add all the questions from databse to the quiz page
sql3="SELECT * FROM `question_admin`"; 
connection.query(sql3,
   function(err,result3,fields){
             app.get("/superadmin/quiz",function(req,res)
              {
                  var data={
                     result: `${result3}`,
                    };
                    data["result"]=result3;
                   res.render('./quiz2',{data});
              })

});

//contact page inside user panel
app.post("/welcome/contact", function(req, res){
    mail=req.body.email;
password=req.body.password;
textmsg=req.body.msg;
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
	user: mail,
	pass: password,
}
});
const mailConfigurations = {
	from: mail,
	to: 'jaydevkalariya27@gmail.com',
	subject: 'analytic Dashboards query',
	text: textmsg
};
	
transporter.sendMail(mailConfigurations, function(error, info){
	if (error) throw Error(error);
	console.log('Email Sent Successfully');
	console.log(info.response);
    res.send("<script> alert('mail sended succesufully');window.location.href='http://localhost:4500/welcome/contact'; </script>");
});});

//contact page inside admin panel
app.post("/admin/contact", function(req, res){
    mail=req.body.email;
password=req.body.password;
textmsg=req.body.msg;
const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
	user: mail,
	pass: password,
}
});

const mailConfigurations = {
	from: mail,
	to: 'jaydevkalariya27@gmail.com',
	subject: 'analytic Dashboards query',
	text: textmsg
};
	
transporter.sendMail(mailConfigurations, function(error, info){
	if (error) throw Error(error);
	console.log('Email Sent Successfully');
	console.log(info.response);
    res.send("<script> alert('mail sended succesufully');window.location.href='http://localhost:4500/admin/contact'; </script>");
});

});

//to count marks of quiz
app.post("/welcome/quiz",urlencodedparser, function(req, res){
         
            let arr1=new Array(),arr2=new Array(),i=0;
            for(i=0;i<req.body.ques.length;i++) {
                         arr1[arr1.length]=req.body.ques[i];
                        arr2[arr2.length]=req.body.opt[i];
                }
            total_marks=10*req.body.ques.length;
            if(i==0)
            {
                temp=0;
                email=req.cookies.email;
                sql="insert into `response`( `email`,`marks`,`total`) VALUES (?)";
                       values=[email,temp,total_marks];   
                       connection.query(sql,[values],function(err,result){
                        if(!err)
                        {
                            console.log("inserted");
                            res.send("<script> alert('submitted!!');window.location.href='http://localhost:4500/welcome/score'; </script>");
                        }
                })
            }
            sum=0;j=0;
            for( i=0;i<arr1.length;i++){
                sql="SELECT * FROM `questions` WHERE `question` LIKE '"+arr1[i]+"' and `ans` LIKE '"+arr2[i]+"'";
                connection.query(sql,
                 function(err,result,fields){
                    j++;
                    sum+=result[0].marks;
                    if(j==arr1.length)
                    {
                       res.cookie("score",sum);
                       res.cookie("totalmarks",total_marks);
                       email=req.cookies.email;
                      percentage=(sum * 100)/total_marks;
                       sql="insert into `response`( `email`,`marks`,`total`,`percentage`) VALUES (?)";
                       values=[email,sum,total_marks,percentage];   
                       connection.query(sql,[values],function(err,result){
                        if(!err)
                        {
                            console.log("inserted");
                            res.send("<script> alert('submitted!!');window.location.href='http://localhost:4500/welcome/score'; </script>");
                        }})
                       sql="insert into `analysis`( `email`,`marks`,`total`,`percentage`) VALUES (?)";  
                       connection.query(sql,[values],function(err,result){})
                    }
                 }
        )}
                });
app.listen(4500);

