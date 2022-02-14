const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ad5980858d1623da5ae0c7844c885b95&query=' + latitude + ',' + longitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast

// const url1 = "http://api.weatherstack.com/current?access_key=ad5980858d1623da5ae0c7844c885b95&query=37.8267,-122.4233&units=m"

// request({ uri: url1, json: true }, (error, response) => {
//     //const data = JSON.parse(response.body)
//     if (error) {
//         console.log("Unable to connect to weather services")
//     } else if (response.body.error) {
//         console.log("Unable to find location")
//     } else {
//         console.log(response.body.current.temperature)
//         console.log(response.body.current.feelslike)
//         console.log(response.body.current.weather_descriptions[0])
//     }
// })


// encodeURIComponent(address)