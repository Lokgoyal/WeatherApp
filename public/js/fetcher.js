

const locationURL = '/forecast?address='


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const Result = document.querySelector('#Result')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()          //Prevent default behaviour on submitting the form

    Result.innerHTML = 'Loading...'
    if(!search.value)
        return Result.innerHTML = "Please provide valid address"
    
    fetch(locationURL + search.value).then((response) =>{

        response.json().then((data) => {
            if(data.error)
                return Result.innerHTML = data.error
            
            Result.innerHTML = "Weather for " + data.location + " is " + data.forecast + " with temperature " + data.temperature + " and humidity " + data.humidity
        })
    })
})



