const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '/../public'))

const app = express()


const publicDirectorypath = path.join(__dirname, '/../public')
const viewsPath = path.join(__dirname,'/../templates/views')
const partialsPath = path.join(__dirname, '/../templates/partials')


app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectorypath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather',
        name: 'Narek'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About',
        image: '/img/robot.png',
        name: 'Narek'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',      
        name: "Narek"
    })
})

app.get('/weather',(req,res)=>{
     
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }
    const location = req.query.address.toString()
            geocode(location, (error,{latitude, longitude, location}={}) =>{
            if(error){
                return res.send({
                    'error': error
                })
            }   
            forecast(latitude, longitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        'error': error
                    })
                }
                return res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
                                
              })
        })


    
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 ERROR',
        name: 'Narek',
        error: 'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404 ERROR',
        name: 'Narek',
        error: 'Page not found!'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})