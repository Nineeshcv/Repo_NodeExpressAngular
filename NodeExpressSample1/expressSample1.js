var express = require("express");
var bodyParser = require('body-parser');
var fs = require("fs");


var expressApp = express();

expressApp.use(function(req,res,next){

    // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);

   // Pass to next layer of middleware
  
   next();
}) 
//expressApp.use(bodyParser.urlencoded({extended:false}));

expressApp.use(bodyParser.urlencoded({ extended: false }));

expressApp.use(bodyParser.json());

expressApp.get("/",function(req,res){
    res.send("<h1>This is index Page </h1>");
});

expressApp.get("/about",function(req,res){
    res.send("<h1>This is About page</h1>");
});

expressApp.get("/students",function(req,res){
    //console.log(req.body);
    res.send("<h1>This is Student Page !</h1>");
    //res.send(req.body);

});

// Using the body-parser to view the body content
 expressApp.post("/login",function(req,res){
    console.log(req.body);
    console.log(req);
    //res.send("<h1>This is Student Page !</h1>");
    //res.send(req.body.myName);
    res.send(req.body);

});

 //url parameters using express
 expressApp.get("/example",function(req,res){
     res.send(req.query);
     //res.send(req.query.name);
 })	

expressApp.get("/profile/:id",function(req,res){
   res.send(req.params.id);
})
expressApp.get("/profile/:id/:name",function(req,res){
   res.send(req.params.id +" " + req.params.name);
})

let profiles ={
   "1":{ id:100,name:'Sachin Tendulkar',age : 40},
   "2":{id: 200,name:'MS Dhoni', age : 39},
   "3":{id:300, name:'Yuv Raj', age : 40}
}

expressApp.get("/profiles/:id",function(req,res){
   let current_id = req.params.id;
   let current_profile=profiles[current_id];
   res.send(current_profile);
})

var filePath="./resources/myFile.json";
expressApp.get("/profiles",function(req,res){
   //let jsonData = {}
   console.log(filePath);
   /*fs.readFile(filePath, 'utf-8', (err, data) => {
         if (err) throw err
 
         jsonData = JSON.parse(data);
         console.log("JsonData:"+jsonData);
   }); */
   let jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
   console.log(" Value of JsonData:"+jsonData);
   res.send(jsonData);
}); 

/*expressApp.get("/test",function(req,res,err){
   if(err) throw err
   res.send(jsonFile);
}) */

 expressApp.listen(8000,function(err){
         console.log("The server is started");
         if(err){
             console.log("The server is failed to start !");
         }
 });