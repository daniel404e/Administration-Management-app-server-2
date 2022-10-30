/* eslint-disable */
 
const express = require("express");
const axios = require("axios");
var cors = require('cors')
var mongoose = require('mongoose');



module.exports =    function (usernametosearch,idtosearch)
{

var userprofiledbname="user-profile"
var returnvalue =10991;

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



  

 


 
  
 
  
 

  usermodel2.find( {}, function (err, docs) {
   
   
    if (err){
        console.log(err);
    }
    else{
        console.log("First function call : ", docs);
        returnvalue=  docs ;

    }
     
    
   

    


});
 

 
 







  

    // db2.close(function () {
    //     console.log('Mongoose default connection closed');
    //   });


     
      
      return(returnvalue)
 
    
  
  

   



}