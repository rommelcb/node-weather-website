const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        author: 'Rommel Blas',
        appName: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        appName: 'Weather App',
        author: 'Rommel Blas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author: 'Rommel Blas',
        appName: 'Weather App',
        content: 'The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, incidunt. Ab dicta, dolores officia accusamus non facilis? Officia, impedit odio!'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address
    if (!address)
        return res.send({ error: 'Please provide an address.' })
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) 
            return res.send({ error })

        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
                return res.send({ error })
            
                res.send({
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Rommel Blas',
        appName: 'Weather App',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Rommel Blas',
        appName: 'Weather App',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})