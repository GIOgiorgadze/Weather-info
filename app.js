const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");

})
app.post("/",function(req,res){

    const query = req.body.cityName;
    const apiKey = "729894044161f240f3951add491e82c0";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){

            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription =weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
    
            res.write("<h1>Temperature in " +query+ " is: "+temp+ " degrees celcius.</h1>");
            res.write(`<h3>The weather ic curently: `+ weatherDescription + `</h3>`);
            res.write("<img src = "+ imageURL +">");
            res.send();
        })
    })

})


app.listen(6500,function(){
    console.log('Server is running on port 6500');
})