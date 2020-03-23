const express = require("express");
const app = express();
// what engine to use when rendering content
app.engine('html', require('ejs').renderFile);
app.set("view engine", "ejs");

//location of static files like css and img
app.use(express.static("public"));

//allows server to make request
const request = require('request');

//home route 
app.get("/", async function(req,res){
    
    
    
    var words = ["house","car","dog","cat","ball","soda","ram",'cute'];
    //random number of 0 to 6
    var ran= Math.floor(Math.random() * 6)
    
    //displays content of the object
        
    let rand = words[ran];
    let orien = "horizontal";
    let parsedData = await getImages(rand,orien);
    
    console.log("parsedData: " + parsedData);
    res.render("index.html", {"images":parsedData});
   

 


});

app.get("/search", async function(req, res){
    
    //console.dir(req);
    let keyword = req.query.keyword; //gets the value that the user typed in the form using the GET method
    let orien = req.query.orientation;
    
    
    let parsedData = await getImages(keyword,orien);

    res.render("search.html", {"images":parsedData});
    
});//results route

//Returns all data from the Pixabay API as JSON format
function getImages(keyword,orien){
    
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword+"&orientation="+orien,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}



//server listener

//ser listener 
app.listen(process.env.PORT , process.env.IP,function(){
    console.log("Express Server is Running...");
});
