import React from 'react';
import { WiDaySunny, WiSunrise, WiSunset, WiStrongWind } from 'weather-icons-react';

const WeatherInfo = ({ weatherData }) => {
  return (
    <div className="weather-info">
      <h1 className="city-name">{weatherData.name}</h1>
      <div className="temperature">
        <h2>{Math.floor(weatherData.main.temp - 273)}°C</h2>
        <WiDaySunny size={50} color="#000" />
      </div>

      <div className="weather-details">
        <p>feels like : {Math.floor(weatherData.main.feels_like - 273)}°C</p>
        <p>
          Wind speed: {weatherData.wind.speed} KM/H <WiStrongWind size={30} color="#000" />
        </p>

        <p>
          Sunrise : <WiSunrise size={30} color="#000" />
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
        <p>
          Sunset : <WiSunset size={30} color="#000" />
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;