
//Importing modules
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const {getGeoCode, getForeCast} = require('./utils/utilities')


//Express Initiated
const app = express()
const port = process.env.PORT || 3000

//Setting directories for different things
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/Views')
const partialsPath = path.join(__dirname, '../templates/partials')

//MOdifying views and view engine property
app.set('views', viewsPath)
app.set('view engine', 'hbs')

//Registering partials that will help in generating templates
hbs.registerPartials(partialsPath)

//App Interface is set
app.use(express.static(publicDirectoryPath))



//Processing different request 


const user = "Lokesh"
//Homepage request
app.get('', (req, res) => {
    res.render('index', {
        filename : 'Homepage',
        user
    })
})



//Help Page Request
app.get('/help', (req, res) => {
    res.render('help', {
        filename : 'Help',
        user
    })
})



//About Page Request
app.get('/about', (req, res) => {
    res.render('about', {
        filename : 'About',
        user
    })
})



//Weather Page Request, I made it on my own, u can uncommet this code 
// app.get('/weather', (req, res) => {
//     if(!req.query.address)
//         return res.render('errorPage',{
//             filename : 'Weather Error',
//             user,
//             message:"Please provide an address!"})

    
    
//     getGeoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
//         if(error)
//             return res.render('errorPage',{
//                 filename : 'Weather Error',
//                 user,
//                 message: error
//             })
        
//         getForeCast(latitude, longitude, (subError, {temperature, summary} = {}) => {
//             if(subError)
//                 return res.render('errorPage',{
//                     filename : 'Weather Error',
//                     user,
//                     message: error
//                 })

//             return res.render('weather', {
//                     filename : 'Weather Report',
//                     temperature,
//                     user,
//                     forecast : summary,
//                     location : location
//                 })
//         })
//     })
    
// })




//Weather page request learned in node js class
app.get('/weather', (req, res) => {
    
    res.render('weather', {
        filename : 'Weather Report',
        user,
    })
    
})



app.get('/forecast', (req, res) => {        

    if(!req.query.address)
        return res.send({error: "Please Provide an address"})
    
    getGeoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
            return res.send({error})

        getForeCast(latitude, longitude, (subError, {temperature, summary} = {}) => {
            if(subError)
                return res.send({subError})
            
            return res.send({
                temperature,
                forecast : summary,
                location
            })
        })
    })
})




//Help Page Specific Requests 
app.get('/help/*', (req, res) => {
    res.render('errorPage' , {
        filename : 'Error 404',
        user,
        message : 'Help article not found'
    })
})



//Processing Requests for Unknown page
app.get('*', (req, res) => {
    res.render('errorPage', {
        filename : 'Bad Request',
        user,
        message : '404 Page not found'
    })
})




//App Launched on port 3000
app.listen(port, () => console.log('server is up and running on port '+ port))

