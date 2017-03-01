var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./server/database/database.js');

var jwt = require('jsonwebtoken');

var router = express.Router()	;

process.env.SECRET = "is this a good token ! indeed";

<!-- controllers -->
var initialcontroller = require('./server/controllers/initialControllers');
var getuserdemandcontroller  = require('./server/controllers/getUserDemandControllers');
//var reqconroller = require('./server/controllers/reqControllers');

<!-- allow to hook up -->
	app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

<!-- end -->

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//app.use('/app',express.static(__dirname + "/app"));
app.use('/node_modules',express.static(__dirname + "/node_modules"));
//app.use('/client',express.static(__dirname+"/client"));

app.use('/secure-api',router);

app.get('/', function (req, res) {
  res.sendfile('index.html');
  
  });

app.post('/registration',initialcontroller.register);
app.post('/login',initialcontroller.logIn);

router.use(function(req,res,next){
	
	var token = req.headers['token'];
	if(token)
		{
			jwt.verify(token,process.env.SECRET,function(err,decoded){
				
				if(err)
					{
						res.send(err);
					}
				else{
					//res.status(400).sendStatus("the user id is :"+decoded.id);
					req.user_id = decoded.id ;
					next();
				}
			})
		}
});	

//router.get('/getCurrentCost',getuserdemandcontroller.getCurrentCost);
app.get('/getCurrentCost/:id',getuserdemandcontroller.getCurrentCost);
app.post('/insertCosts',getuserdemandcontroller.insertcosts);
app.post('/insertIncomes',getuserdemandcontroller.insertincome);
app.post('/getReportsIncomes',getuserdemandcontroller.getreportincome);
app.post('/getReportsCosts',getuserdemandcontroller.getreportcosts);

db.sync().then(function(){
	app.listen(3000,function(){
		console.log("it works..");
	})
})