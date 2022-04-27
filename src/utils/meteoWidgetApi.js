import axios from 'axios';

const meteoWidgetApi = {
  getWeather(city) {
    return axios.get(`${process.env.REACT_APP_API_URL}weather?q=${city},fr&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
  },
};

export default meteoWidgetApi;
