
axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=fc2e8733f64589d69c5947d74a2640e5`)
  .then(res => {
    const weather = res.data
    const latitude = weather.city.coord.lat
    const longtitude = weather.city.coord.lon

    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longtitude}&units=imperial&appid=fc2e8733f64589d69c5947d74a2640e5`)
  
      .then(resp => {
        let today = resp.data
        const uvi = resp.data.current.uvi
        const city = weather.city.name

        let currentTemp = {
          temp: today.current.temp,
          huid: today
        }
      })
  })

