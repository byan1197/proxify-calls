const axios = require("axios");

const Weather = {
  getCurrentWeather: async () => {
    return await axios.default
      .get(
        `https://api.openweathermap.org/data/2.5/weather?id=6077246&appid=${process.env.weather_api_key}&units=metric`
      )
      .then((res) => res.data)
      .then((weatherApiResponse) => {
        console.log("weatherApiResponse", weatherApiResponse);
        if (weatherApiResponse.cod === 200) {
          return weatherApiResponse;
        }
        throw new Error(weatherApiResponse);
      });
  },
};

module.exports = Weather;
