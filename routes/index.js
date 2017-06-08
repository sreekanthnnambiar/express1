var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var client = new cassandra.Client({contactPoints: ['127.0.0.1:9042'], keyspace: 'demo'});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

var results=[];

//getJobDetailsFromDB();
function getJobDetailsFromDB(){
  client.execute("select * from demo.company",function(err,result){
    if(!err)
    {
      for(var i=0;i<50;i++)
      {
        var results=result.rows[i];
      console.log(results.company_name,results.job_title+"\n");
      }
     
    }
    else
    {
      console.log("there is nothing to display");
    }
  })
}




router.get('/',function(req,res){

  client.execute("select * from demo.company",[],function(errr,resultt){
    if(!errr)
    {
      console.log(resultt);
     // console.log("selected all companiess"+resultt);
      res.render('index',{
        jobs:resultt.rows
      })
    }
    else
    {
      console.log("error occured")
    }
  
});

});

module.exports = router;
