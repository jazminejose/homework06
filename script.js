// creating local storage
let history = JSON.parse(localStorage.getItem('searchedHistory')) || []
console.log(history)
for (let i = 0; i < history.length; i++) {
  let historyBox = document.getElementById('searched')
  let cityButton = document.createElement('button')
  cityButton.innerText = history[i]
  historyBox.appendChild(cityButton)
}
// get information from previous search results
document.getElementById('searched').addEventListener('click', event => {
  const cityName = event.target.innerText
  let foundInArray = false
  for (let i = 0; i < history.length; i++) {
    if (history[i] === cityName) {
      foundInArray = true
    }
  }
  if (!foundInArray) {
    history.push(cityName)
  }

  localStorage.setItem('searchedHistory', JSON.stringify(history))
  // getting weather data, lat and longtitude
  axios.get(`
https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=fc2e8733f64589d69c5947d74a2640e5`)
    .then(res => {
      const weather = res.data


      const latitude = weather.city.coord.lat
      const longtitude = weather.city.coord.lon
      // getting uvi data
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&units=imperial&appid=fc2e8733f64589d69c5947d74a2640e5`)

        // making arrays 

        .then(resp => {
          let today = resp.data
          const uvi = resp.data.current.uvi
          const city = weather.city.name
          // today's weather
          let current = {
            temp: today.current.temp,
            humid: today.current.humidity,
            wind: today.current.wind_speed,
            icon: today.current.weather[0].icon,
            uvi: uvi
          }
          // next 5 days
          let day1 = {
            date: weather.list[0].dt_txt.split(" ")[0],
            temp: weather.list[0].main.temp,
            humid: weather.list[0].main.humidity,
            wind: weather.list[0].wind.speed,
            icon: weather.list[0].weather[0].icon
          }

          let day2 = {
            date: weather.list[8].dt_txt.split(" ")[0],
            temp: weather.list[8].main.temp,
            humid: weather.list[8].main.humidity,
            wind: weather.list[8].wind.speed,
            icon: weather.list[8].weather[0].icon
          }
          let day3 = {
            date: weather.list[16].dt_txt.split(" ")[0],
            temp: weather.list[16].main.temp,
            humid: weather.list[16].main.humidity,
            wind: weather.list[16].wind.speed,
            icon: weather.list[16].weather[0].icon
          }
          let day4 = {
            date: weather.list[24].dt_txt.split(" ")[0],
            temp: weather.list[24].main.temp,
            humid: weather.list[24].main.humidity,
            wind: weather.list[24].wind.speed,
            icon: weather.list[24].weather[0].icon
          }
          let day5 = {
            date: weather.list[32].dt_txt.split(" ")[0],
            temp: weather.list[32].main.temp,
            humid: weather.list[32].main.humidity,
            wind: weather.list[32].wind.speed,
            icon: weather.list[32].weather[0].icon
          }
          // append to html
          document.getElementById('today').innerHTML = ''
          const currentElem = document.createElement('div')
          currentElem.innerHTML = `
          <div class= "currentday">
            <h4>Current</h4>
            <h3>City:</h3> 
            <h5>${city} </h5>
            <img src="http://openweathermap.org/img/w/${current.icon}.png" alt="icon">
            <h3>Temperature:</h3> ${current.temp}
            <h3>Humidity:</h3> ${current.humid}
            <h3>Wind:</h3> ${current.wind}
            <h3>UVI:</h3> ${uvi}
          </div>
        `
          // append to html
          document.getElementById('today').append(currentElem)

          let forecasts = [day1, day2, day3, day4, day5]

          document.getElementById('forecast').innerHTML = ''
          forecasts.forEach(day => {

            document.getElementById('forecast').innerHTML += `
              <div class="card" style="width: 11rem";>
                  <img src="http://openweathermap.org/img/w/${day.icon}.png" class="card-img-top" alt="icon">
                  <div class="card-body">
                  <h4 class="card-title">${day.date}</h4>
                  <p class="card-text">            
                  <h3>Temperature:</h3> ${day.temp}
                  <h3>Humidity:</h3> ${day.humid}
                  <h3>Wind:</h3> ${day.wind}</p>
              </div>
            </div>
        `
          })
        })

    })
})

// when click on the search button
document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()

  const cityName = document.getElementById('searchCity').value

  let foundInArray = false
  for (let i = 0; i < history.length; i++) {
    if (history[i] === cityName) {
      foundInArray = true
    }
  }
  if (!foundInArray) {
    history.push(cityName)
  }

  localStorage.setItem('searchedHistory', JSON.stringify(history))
  // getting weather informations
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=fc2e8733f64589d69c5947d74a2640e5`)
    .then(res => {
      const weather = res.data

      const latitude = weather.city.coord.lat
      const longtitude = weather.city.coord.lon
      // getting uvi
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&units=imperial&appid=fc2e8733f64589d69c5947d74a2640e5`)
        // repeating the array
        .then(resp => {
          let today = resp.data
          const uvi = resp.data.current.uvi
          const city = weather.city.name
          // today weather
          let current = {
            temp: today.current.temp,
            humid: today.current.humidity,
            wind: today.current.wind_speed,
            icon: today.current.weather[0].icon,
            uvi: uvi
          }
          // next 5 days
          let day1 = {
            date: weather.list[0].dt_txt.split(" ")[0],
            temp: weather.list[0].main.temp,
            humid: weather.list[0].main.humidity,
            wind: weather.list[0].wind.speed,
            icon: weather.list[0].weather[0].icon
          }

          let day2 = {
            date: weather.list[8].dt_txt.split(" ")[0],
            temp: weather.list[8].main.temp,
            humid: weather.list[8].main.humidity,
            wind: weather.list[8].wind.speed,
            icon: weather.list[8].weather[0].icon
          }
          let day3 = {
            date: weather.list[16].dt_txt.split(" ")[0],
            temp: weather.list[16].main.temp,
            humid: weather.list[16].main.humidity,
            wind: weather.list[16].wind.speed,
            icon: weather.list[16].weather[0].icon
          }
          let day4 = {
            date: weather.list[24].dt_txt.split(" ")[0],
            temp: weather.list[24].main.temp,
            humid: weather.list[24].main.humidity,
            wind: weather.list[24].wind.speed,
            icon: weather.list[24].weather[0].icon
          }
          let day5 = {
            date: weather.list[32].dt_txt.split(" ")[0],
            temp: weather.list[32].main.temp,
            humid: weather.list[32].main.humidity,
            wind: weather.list[32].wind.speed,
            icon: weather.list[32].weather[0].icon
          }
          // append to html
          document.getElementById('today').innerHTML = ''
          const currentElem = document.createElement('div')
          currentElem.innerHTML = `
            <h3>Current</h3>
            <h3>City:</h3> 
            <h5>${city}</h5>
            <img src="http://openweathermap.org/img/w/${current.icon}.png" alt="icon">
            <h3>Temperature:</h3> ${current.temp}
            <h3>Humidity:</h3> ${current.humid}
            <h3>Wind:</h3> ${current.wind}
            <h3>UVI:</h3> ${uvi}
        `
          // append to html
          document.getElementById('today').append(currentElem)

          let forecasts = [day1, day2, day3, day4, day5]

          document.getElementById('forecast').innerHTML = ''
          forecasts.forEach(day => {

            document.getElementById('forecast').innerHTML += `
            <div class="card" style="width: 11rem";>
              <img src="http://openweathermap.org/img/w/${day.icon}.png" class="" alt="icon">
                  <div class="card-body">
                  <h5 class="card-title">${day.date}</h5>
                  <p class="card-text">            
                  <h3>Temperature:</h3> ${day.temp}
                  <h3>Humidity:</h3> ${day.humid}
                  <h3>Wind:</h3> ${day.wind}</p>
              </div>
            </div>
        `
          })
        })

    })
})