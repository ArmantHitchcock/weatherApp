const express = require('express')

const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const portNo = 3000

const app = express()

//setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, "../templates/views"))
hbs.registerPartials(path.join(__dirname, "../templates/partials"))

app.use(express.static(path.join(__dirname, "../public")))

//route handlers
app.get("", function (req, res) {
    res.render('index', {
        title: 'Weather App',
        name: 'Armant'
    })
})

app.get("/help", function (req, res) {
    res.render('help', {
        title: 'Weather App',
        name: 'Armant'
    })
})

app.get("/about", function (req, res) {
    res.render('about', {
        title: 'Weather App',
        name: 'Armant'
    })
})

app.get("/weather", function (req, res) {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a adress term'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
})

app.get("/products", function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get("/help/*", function (req, res) {
    res.render('404', {
        data: 'help artical not available',
        title: 'Weather App',
        name: 'Armant'
    })
})

app.get("*", function (req, res) {
    res.render('404', {
        data: 'Page does not exist',
        title: 'Weather App',
        name: 'Armant'
    })
})

app.listen(portNo, function () {
    console.log('Server is up on port ' + portNo)
})
