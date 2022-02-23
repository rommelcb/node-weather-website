const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4232578d7852c6b3e93f57445b310b09&query=' + latitude + ',' + longitude + '&units=m'
    // units: m=celsius, f=fahrenheit, s=kelvin,

    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback('Unable to connect to weather service!', undefined)
        else if (body.error)
            callback('Unable to find location!', undefined)
        else
            callback(
                undefined, 
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees outside; but feels like 
                 ${body.current.feelslike} degrees. The humidity is ${body.current.humidity}%.`
            )
    })
}

module.exports = forecast