
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne =  document.getElementById('forecastInfo')


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location1 = search.value

    fetch('http://localhost:3000/weather?address=' + location1).then((response) =>{
    response.json().then( ({error , forecast} ) =>{
        if (error){
            messageOne.innerHTML = 'Please check your location';
            return console.log('Please check your location')
        }
        console.log(forecast)
        messageOne.innerHTML = forecast;

    })
})


    //console.log(location)
})