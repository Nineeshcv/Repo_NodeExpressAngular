var express = require("express");
var bodyParser = require("body-parser");
var PropertiesReader = require("properties-reader");
var fs = require('fs');

const homeDir = require('os').homedir();
var properties = PropertiesReader(homeDir+"/.npmrc");

var app = express();

app.use(function(req,res,next){

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

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.route("/npmrc/config").get(function(req,res){
       
    var allProps = properties.getAllProperties();
    
        //res.send(allProps);
    let jsonValue={
            'proxy': properties.get('proxy'),
            'https-proxy':properties.get('https-proxy'),
            'access':properties.get('access'),
            'values':"json Data valuse"
        }

        let jsonResult = {};
        console.log("Length of the Properties :"+properties.length);
        console.log("Values from the file :"+allProps);
        jsonResult = allProps;
        
        //delete jsonResult['proxy'];
        //res.send(jsonData);
      /*  var result = Object.keys(jsonResult).map(function (key) { 
          
            // Using Number() to convert key to number type 
            // Using obj[key] to retrieve key value 
            return [(key), jsonResult[key]]; 
        }); */
        var result = Object.entries(jsonResult);  

        res.send(result);
}); 
    
    
    app.route("/npmrc/config/:key").post((req,res)=>{
        const key = req.params['key'];
        console.log("The value of key is :"+key);
        res.send(properties.get(key));
    });
    
    app.route("/npmrc/config/:key/:value").put((req,res) =>{
        const key = req.params['key'];
        const value = req.params['value'];
        properties.set(key,value);
        properties.save(homeDir+"/.npmrc");
        /*var newProperties = new PropertiesReader(homedir+'/.npmrc');
        newProperties.set(key,value);
        newProperties.save(homedir+"/.npmrc"); */
        //res.send(200,req.body);
        var allProps = properties.getAllProperties();
        console.log(Object.getOwnPropertyNames(PropertiesReader));
         res.status(200).send(allProps);
    
    })

   /* app.route('/npmrc/config/:key').delete((req, res) => {
       // var newProperties = new PropertiesReader(homedir+'/.npmrc');
       // newProperties.set("key","myValue");
        const key = req.params['key'];
        const value = req.params['value'];
        
       // properties.delete
        var allProps = properties.getAllProperties();
        let jsonResult = allProps;
        delete jsonResult['proxy'];
        allProps = jsonResult;
        fs.writeFileSync(homeDir+"/.npmrc","",function(err){
            if(err)  throw err;
            console.log("New File Created !!!")
        })
        
       var newProperties = new PropertiesReader(homeDir+'/.npmrc');
        newProperties.set("https-proxy",properties.get("https-proxy"));
        newProperties.set("access",properties.get("https-proxy"));
        newProperties.save(homeDir+"/.npmrc");
        allProps = newProperties.getAllProperties(); 
        console.log("The length of PRo:"+properties.length);
        properties.each((key,value)=>{
            console.log("Value of Key:"+key);
            console.log(value);
        })
        

      //  console.log(typeof(jsonResult));
        
        //console.log(allProps.map(item => item.message));
     // res.sendStatus(204)
        res.status(200).send(allProps);
    })*/

app.route("/npmrc/config/:key").delete((req,res)=>{
   
    const key = req.params['key'];
    var newProperties;
    //var allProps = properties.getAllProperties();
   
    fs.writeFileSync(homeDir+"/.npmrc","",function(err){
        if(err)  throw err;
        console.log("New File Created !!!")
    })
   
    try{
        newProperties = new PropertiesReader(homeDir+"/.npmrc");
        properties.each((_key,_value)=>{
            if(key != _key ){
             newProperties.set(_key,_value);
            }
        })
        newProperties.save(homeDir+"/.npmrc");
        properties = newProperties;
    }catch(error){
        throw error;
    }
    var result = Object.entries(newProperties.getAllProperties());
    res.status(200).send(result);

})
app.listen(8000,()=>{
    console.log("The server is started at 8000");
})