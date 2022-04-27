import meteoWidgetApi from 'src/utils/meteoWidgetApi';
import MoreInfo from 'src/components/MoreInfo';
import Button from 'src/components/Button';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export default function MeteoWidget({ city, code }) {
  const [temperature, setTemperature] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);
  const [icon, setIcon] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false);
  const [humidity, setHumidity] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [wind, setWind] = useState(0);
  const [coord, setCoord] = useState({});

  useEffect(() => {
    meteoWidgetApi.getWeather(code)
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
      .catch((error) => console.error(error));
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setMoreInfo(!moreInfo);
  };

  return (
    <div>
      <article className="meteo">
        <div className="meteo__container">
          <div className="meteo__infos">
            <div className="meteo__infos__header">
              <h3 className="meteo__infos__header__city">{city}</h3>
              <p className="meteo__infos__header__code">{code}</p>
            </div>
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

MeteoWidget.propTypes = {
  city: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
};
