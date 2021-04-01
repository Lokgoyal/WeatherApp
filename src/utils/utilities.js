const request = require("request")


//Function to get Coordinates of location using mapBox API
const getGeoCode = (locationName, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(locationName) +'.json?access_token=pk.eyJ1IjoibG9rZXNoZ2wiLCJhIjoiY2ttdWZnNHZmMHV3dzJwbXd5ZnhlZjcybCJ9.RDdrRllkW5Tha1dY9D6YBA&limit=1'

    request({url, json : true}, (error, response) => {
        
        if(error)
            callback('Cannot connect to mapBox API', undefined)
        else if(response.body.features < 1)
            callback('Unable to find Location, Please try different location!', undefined)
        else
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
    })
}



//Function to get Weather forecast for the Provided Coordinates from getGeoCode Function
const getForeCast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=613d8b20b4781327525e5c52ffd1f3ea&query=' + latitude + ',' + longitude

    request({url, json :true}, (error, response) => {

        if(error)
            callback('Can not connect to weather stack API')            //if second arguement is not provided, by default undefined will be set as default value
        else if(response.body.error)
            callback('Coordinates ' + latitude + ',' + longitude + ' are invalid')
        else
            callback(undefined, {
                temperature : response.body.current.temperature,
                feelslike : response.body.current.feelslike,
                summary : response.body.current.weather_descriptions[0],
                humidity : response.body.current.humidity
            })
    })
    
}


//using property shorthand to set the properties here, consider propertyShorthands file inside playground folder
module.exports = {
    getGeoCode,
    getForeCast
}
