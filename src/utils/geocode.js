const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXJvZ29uMTciLCJhIjoiY2tzeG1sMG9nMTg1bzJwcHVxcTZ2cW94eiJ9.UHiZlBGRp7EZXQBBKCMdTQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
module.exports = geocode

// const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/Durban.json?access_token=pk.eyJ1IjoiYXJvZ29uMTciLCJhIjoiY2tzeG1sMG9nMTg1bzJwcHVxcTZ2cW94eiJ9.UHiZlBGRp7EZXQBBKCMdTQ&limit=1"


// request({ uri: url2, json: true }, (error, response) => {
//     if (error) {
//         console.log("Unable to connect to location services")
//     } else if (response.body.features.length === 0) {
//         console.log("Unable to find location")
//     } else {
//         const latitude = response.body.features[0].center[1]
//         const longitude = response.body.features[0].center[0]
//         console.log(response.body.features[0].place_name)
//         console.log(latitude, longitude)
//     }
// })

// encodeURIComponent(address)