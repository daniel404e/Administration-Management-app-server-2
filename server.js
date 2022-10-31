/* eslint-disable */
 
const express = require("express");
const axios = require("axios");
var cors = require('cors')
var mongoose = require('mongoose');
var userprofiling = require ("./getuserprofile");
 

var app = express();
app.use(cors())
app.use(express.urlencoded({extended:false}));
var tosend;


//////////////////////////////////////////////////////////////////////////
var data1;
var databasename = "rmms";
 
 
var mongoDB = 'mongodb+srv://rmms:rmms@cluster0.5rfdysz.mongodb.net/'+databasename+'?retryWrites=true&w=majority';

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});


 


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected  successfully");
});
 



const MessageSchema = new mongoose.Schema({
    user_name: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: true,
    },
  });

  

  const messagemodel = mongoose.model("User", MessageSchema);

 



 

/////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/createchatroom/:chatroomname",function(request,response,next){

    var nameofroom = request.params.chname;

    const messagemodel = mongoose.model( nameofroom, MessageSchema);

  

response.send(String("chatroom created"));
});


app.get("/sendmessage/:fromuser/:chatroomname/:datatosend",function(request,response,next){

    var user = request.params.fromuser;
    var chatroomname =  request.params.chatroomname;
    var datatosend =  request.params.datatosend;

    const messagemodel = mongoose.model( chatroomname, MessageSchema);

    messagemodel.insertMany(
        { 
          "user_name": user, 
          "data": datatosend,
        
        },
        
    ).then(function(){
        response.send(String("Data inserted")); 
        console.log("Data inserted")  // Success
    }).catch(function(error){
        response.send(String(error)); 
        console.log(error)      // Failure
    });
  


});



 app.get("/getuserallowed/:fromuser/:docid",function(request,response){

    var user = request.params.fromuser;
    var documentid =  request.params.docid;
   
    console.log(user);

//////////////////////////////////////////////////////////////////////
var userprofiledbname="user-profile"
 

var mongodbconn2     = 'mongodb+srv://rmms:rmms@cluster0.5rfdysz.mongodb.net/'+userprofiledbname+'?retryWrites=true&w=majority';

const db2 =  mongoose.createConnection(mongodbconn2, {useNewUrlParser: true, useUnifiedTopology: true});

 


   const UserprofileSchema = new mongoose.Schema({
    user_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    
      allowedrooms: {
        type: [String],
        required: false,
      },
       dob:{
         type: Date,
         required: true,


       }

  });

  const usermodel2 = db2.model("User-profile", UserprofileSchema);

  usermodel2.find( {user_name: user ,_id:documentid  }, function (err, docs) {
   
   
    if (err){
        console.log(err);
    }
    else{
        console.log("First function call : ", docs);
            

    }
     
    console.log(docs);
  response.send( docs );

  db2.close(function () {
    console.log('Mongoose default connection closed');
  });
   

    


});
 
 
});




app.get("/getallmessages/:fromuser/:chatroom" , function(request,response)
{

    var user = request.params.fromuser;
    var chatroomname =  request.params.chatroom;

    const messagemodel = mongoose.model( chatroomname, MessageSchema);


    
    
    messagemodel.find({}, function (err, data2) {
  if (err){
  console.log(err);
   
  }
  else{
   
  }
  console.log(data2);
  response.send( data2 );
  });
  
  
  
  
  
  })
  

 

  app.get("/getuserallowed/:fromuser",function(request,response,next){

    var usernametosearch = request.params.fromuser;

    const messagemodel = mongoose.model( nameofroom, MessageSchema);

  

response.send(String("chatroom created"));
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getuserprofile/:username",function(request,response){

  var user = request.params.username;
  
 
  console.log(user);
 
var userprofiledbname="user-profile"


var mongodbconn3    = 'mongodb+srv://rmms:rmms@cluster0.5rfdysz.mongodb.net/'+userprofiledbname+'?retryWrites=true&w=majority';

const db3 =  mongoose.createConnection(mongodbconn3, {useNewUrlParser: true, useUnifiedTopology: true});




 const UserprofileSchema2 = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  
    allowedrooms: {
      type: [String],
      required: false,
    },
     dob:{
       type: Date,
       required: true,


     }

});

const usermodel2 = db3.model("User-profile", UserprofileSchema2);

usermodel2.find( {user_name: user }, function (err, docs) {
 
 
  if (err){
      console.log(err);
  }
  else{
      console.log("First function call : ", docs);
          

  }
   
  console.log(docs);
response.send( docs );

db3.close(function () {
  console.log('Mongoose default connection closed');
});
 

  


});


});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.get("/auth/:uname/password/:password",function(request,response,next){


           var docs 
           var tocheckuname = request.params.uname;
           var tocheckpassword = request.params.password;
           var ifauthenticated =0;
           
             
           messagemodel.find({user_name: tocheckuname}, function (err, docs) {
    if (err){
        console.log(err);
        data1 = err;
    }
    else{
        
        if(docs[0])
        {
        if(docs[0].password == tocheckpassword )
        {
          ifauthenticated=1;  
        }
        else
        {
          console.log("wrong password")
          ifauthenticated = -2;
        }
      }
      else
      {
        console.log("username not registered")
        ifauthenticated = -1;
      }

    data1=docs;
    }

    response.send(String(ifauthenticated));
});



  
   
})

 



 

 

app.listen(4100,function() { console.log("port established");});