const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

// 
const publicPath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialPath)

app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather App',
        name: 'Duy Nam'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name: 'Duy Nam'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help Page',
        name: 'Duy Nam',
        message: 'Hello you'
    })
})


app.get('/weather', (req, res) =>{
    if (!req.query.address)
   {
       return res.send({
           errorMesssage: 'You need to provide the location!' 
       })
   } 

   geocode(req.query.address, (error, {latitude, longtitude, location} = {} ) =>{
    if (error){
        return res.send({error})
    }
    
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
            res.send({
                address: location,
                forecast: forecastData.weather_descriptions
            })
        })
    })
})


app.get('/products', (req, res) => {
   if (!req.query.searchKey)
   {
       return res.send({
           errorMesssage: 'You need to provide the search term!' 
       })
   } 
    console.log(req.query)
    res.send({
        product:[],
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        errorMesssage:'Help not found',
        name: 'Duy Nam'
    })
})

app.get('*', (req,res)=>{
    res.render('404',{
        title:'404',
        errorMesssage:'Page not found',
        name: 'Duy Nam'
    })
})
app.listen(3000, () =>{
    console.log('Server is Up on port 3000')
})

