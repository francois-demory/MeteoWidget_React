import PropTypes from 'prop-types';

import './styles.scss';

export default function MoreInfo({
  humidity,
  pressure,
  wind,
  coord,
  moreInfo,
}) {
  return (
    <div className={moreInfo ? 'info info--visible' : 'info'}>
      {moreInfo && (
        <div className="info__content">
          <div className="info__details">
            <p className="info__details__data">Humidité: {humidity} %</p>
            <p className="info__details__data">Pression: {pressure} hPa</p>
            <p className="info__details__data">Vent: {wind} m/s</p>
          </div>
          <div className="info__map">
            <p className="info__map__data">Lat. {coord.lat}</p>
            <p className="info__map__data">Long. {coord.lon}</p>
          </div>
        </div>
      )}
    </div>
  );
}

MoreInfo.propTypes = {
  humidity: PropTypes.number.isRequired,
  pressure: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  coord: PropTypes.object.isRequired,
  moreInfo: PropTypes.bool.isRequired,
};
