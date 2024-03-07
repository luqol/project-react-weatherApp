import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError]= useState(false);

  const handleCityChange = useCallback( city => {
    setPending(true);
    setError(false);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fc2bd9056fdea1b1b3733049f82ce31a&units=metric`)
      .then( res => {
        if(res.status === 200){
          return res.json()
          .then(data => {
            const weatherData =  {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].description,
            };
            setPending(false);
            setWeather(weatherData);
          })
        } else {
          console.log(res);
          setPending(false);
          setError(true);
        }
      });
  }, [] );
  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      { (weather && !pending && !error) && <WeatherSummary  {...weather} />}
      { pending && <Loader />}
      { error && <ErrorBox > 
        <p>There is no such city!</p>
      </ErrorBox> }
    </section>
  )
};

export default WeatherBox;