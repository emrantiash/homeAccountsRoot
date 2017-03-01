//পৃথিবীর কিছু কিছু গল্প, পৃথিবীর চেয়েও সুন্দর।
var db = require('../database/database');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);
//var password = bcrypt.hashSync(req.body.user_password, salt); 

var jwt = require('jsonwebtoken') ;

module.exports.register = function(req,res)
{
	var name = req.body.name;
	var upassword = req.body.upassword ; 
	var email = req.body.email ; 
	
	var make_password = bcrypt.hashSync(upassword, salt);
	
	//console.log(make_password);
	var today = new Date(); 
		var dd = today.getDate(); 
		var mm = today.getMonth()+1; //January is 0! 
		var yyyy = today.getFullYear(); 
		if(dd<10){ dd='0'+dd; } if(mm<10){ mm='0'+mm; } 
		var today = yyyy+'-'+mm+'-'+dd; 
	
	var query = "INSERT INTO `users`(`name`, `password`, `emil`, `joindata`) VALUES('"+name+"','"+make_password+"','"+email+"','"+today+"')";
	
	db.query(query).spread(function(response,metadata){
		
		res.status(200).send("user created successfully") ;
	}).catch(function(err){
		
		res.status(500).send(err);
	})
}

module.exports.logIn = function(req,res)
{
	//console.log("enter");
    var submittedPassword =  req.body.upassword ;

    var query = "SELECT * from users where name = '"+req.body.name+"' " ;
	
	db.query(query).spread(function(result,metadata){
		
		if(result.length>0)
			{
				var userdata = result[0];
				var userpassword = userdata.password ;
				var isVarified = bcrypt.compareSync(submittedPassword,userpassword);
				var token = jwt.sign(userdata,process.env.SECRET,{
						expiresIn : 60*60*24 
					})
			if(isVarified)
				{
				delete userdata.password ; 
				res.json({
				userdata : userdata,
				token : token
			})
			
				}
				else{
					
					res.status(400).send("wrong  password ") ;
				}
				
				}
		else
			{
				res.status(400).send("wrong username.. ") ;
			}
		
		
	}).catch(function(err){
		res.status(500).send("sorry..unable to process the query .") ;
	})
    
   
}