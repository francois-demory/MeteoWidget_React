import axios from 'axios';

const meteoWidgetApi = {
  getWeather(code) {
    return axios.get(`${process.env.REACT_APP_API_URL}weather?zip=${code},fr&units=metric&appid=${process.env.REACT_APP_API_KEY}`);
  },
};

export default meteoWidgetApi;
