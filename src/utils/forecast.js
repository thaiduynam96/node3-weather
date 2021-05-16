const request = require('request')

const forecast = (latitude, longtitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=b0af21562dd4826ac83c5a6b97e770b9&query=' + latitude + ',' + longtitude +'&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to Weather Service', undefined)
        } else if(body.error){
            callback('Unable to find the location', undefined)
        }else{
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast 