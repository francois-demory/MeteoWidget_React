import meteoWidgetApi from 'src/utils/meteoWidgetApi';
import MoreInfo from 'src/components/MoreInfo';
import Button from 'src/components/Button';

import { useEffect, useState } from 'react';

import './styles.scss';

export default function MeteoWidget() {
  const [temperature, setTemperature] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [icon, setIcon] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState(0);
  const [coord, setCoord] = useState({});
  const [city, setCity] = useState('Montpellier');
  const [error, setError] = useState(null);

  const fetchMeteo = (searchedCity) => {
    setError(false);
    meteoWidgetApi.getWeather(searchedCity)
      .then((response) => {
        setTemperature(Math.round(response.data.main.temp));
        setMinTemp(Math.round(response.data.main.temp_min));
        setMaxTemp(Math.round(response.data.main.temp_max));
        setIcon(response.data.weather[0].icon);
        setHumidity(response.data.main.humidity);
        setPressure(response.data.main.pressure);
        setWind(response.data.wind.speed);
        setCoord(response.data.coord);
      })
      .catch(() => {
        setError(!error);
      });
  };

  useEffect(() => {
    fetchMeteo(city);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setMoreInfo(!moreInfo);
  };

  const handleChange = (e) => {
    setError(false);
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMeteo(city);
  };

  return (
    <div>
      <article className="meteo">
        <div className="meteo__container">
          <div className="meteo__infos">
            <form className="meteo__infos__form" onSubmit={handleSubmit}>
              <input
                className="meteo__infos__form__city"
                type="text"
                placeholder="Search..."
                value={error ? 'Erreur' : city}
                onChange={handleChange}
                maxLength="30"
              />
              <button className="meteo__infos__form__submit" type="submit">Chercher</button>
            </form>
            <p className="meteo__infos__temperature">{temperature}°</p>
          </div>
          <div className="meteo__temps">
            <p className="meteo__temps__temp">min. {minTemp}°</p>
            <p className="meteo__temps__temp">max. {maxTemp}°</p>
          </div>
          <div className="meteo__icon">
            <img className="meteo__icon__today" src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
          </div>
        </div>
        <Button handleClick={handleClick} />
      </article>
      <div>
        <MoreInfo
          humidity={humidity}
          pressure={pressure}
          wind={wind}
          coord={coord}
          moreInfo={moreInfo}
        />
      </div>
    </div>

  );
}
