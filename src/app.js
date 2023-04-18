const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 5000;  //for hosting purposes
const path = require("path");

//public static path
const staticPath = path.join(__dirname, '../public');
const template_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

//dynamic
app.set('view engine', 'hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);

//static
app.use(express.static(staticPath));

//routing
app.get("/", (req,res)=>{
    res.render(index);
});

app.get("/about", (req,res)=>{
    res.render('about');
});

app.get("/weather", (req,res)=>{
    res.render('weather');
});

app.get("*", (req,res)=>{
    res.render('404error');
});


app.listen(port, ()=>{
    console.log(`listening to port ${port}.....`);
});

