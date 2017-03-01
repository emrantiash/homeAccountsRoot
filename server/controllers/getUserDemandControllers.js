var db = require('../database/database.js');

module.exports.getCurrentCost = function(req,res)
{
	//res.status(400).status(req.body.uid);
	//var query = "SELECT * from costs where uid ='"+req.user_id+"'  ";//var id = req.params.id;
	//var query = "SELECT * from costs  where uid ='"+req.query.id+"' ";
	//console.log(req.params.id);
	var query = "SELECT * from costs  where uid ='"+req.params.id+"' order by id DESC LIMIT 5 ";
	
	
	db.query(query).spread(function(metadata,result){
		
		var userdata = result;
		res.json({
			data : userdata 
		})
		
		
	}).catch(function(err){
		console.log(err);
		
	})
	
	
}

module.exports.insertcosts = function(req,res)
{
	var uid = req.body.uid ;
	//console.log("uid="+uid);
	var status = 1 ;
	
	var query = "INSERT INTO `costs`(`uid`, `title`, `costs`, `date`,`note`, `status`) VALUES ('"+uid+"','"+req.body.title+"','"+req.body.amount+"','"+req.body.sdate+"','"+req.body.note+"','"+status+"')" ;
	
	db.query(query).spread(function(metadata,result){
		
		res.json({
			data : 1 
		})
	}).catch(function(err){
		
		console.log(err);
	})
	
}

module.exports.insertincome = function(req,res)
{
	var uid = req.body.uid ;
	//console.log("uid="+uid);
	var status = 1 ;
	
		var query = "INSERT INTO `incomes`(`uid`, `title`, `income`, `date`,`note`, `status`) VALUES ('"+uid+"','"+req.body.title+"','"+req.body.amount+"','"+req.body.sdate+"','"+req.body.note+"','"+status+"')" ;
	
	db.query(query).spread(function(metadata,result){
		
		res.json({
			data : 1 
		})
	}).catch(function(err){
		
		console.log(err);
	})
}

module.exports.getreportincome = function(req,res)
{
	 uid = req.body.uid ;
	console.log("uid="+uid);
	
	var query = "SELECT * FROM `incomes` WHERE `uid` = '"+uid+"' and (date  between '"+req.body.sdate+"' and '"+req.body.ldate+"')  ";
	
	db.query(query).spread(function(metadata,response){
		
		
		res.json({
			data : response
		})
		//res.status(400).send("data found .."+data);
	}).catch(function(err){
		console.log(err);
	})
	

	
}

module.exports.getreportcosts = function(req,res)
{
	 uid = req.body.uid ;
	console.log("uid="+uid);
	
	var query = "SELECT * FROM `costs` WHERE `uid` = '"+uid+"' and (date  between '"+req.body.sdate+"' and '"+req.body.ldate+"')  ";
	
	db.query(query).spread(function(metadata,response){
		
		
		res.json({
			data : response
		})
		//res.status(400).send("data found .."+data);
	}).catch(function(err){
		console.log(err);
	})
	

	
}