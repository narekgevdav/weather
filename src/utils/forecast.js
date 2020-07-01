const request = require('postman-request')
const forecast = (latitude,longitude,callback) =>{
        const url = `http://api.weatherstack.com/current?access_key=6192b544f74e7c1ba0398bc9086c33c0&query=${latitude},${longitude}&units=m`
        request({url,json:true},(error,{body}) =>{
            if(error){
                callback('Unable to connect to weather service!')
            } else if(body.error){
                callback('Unable to find location')
            } else {
                callback(undefined,body.current.weather_descriptions[0] + `. In ${body.location.region} it is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degress out`)
            }
        })
}



module.exports = forecast