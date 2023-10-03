import { useState, useRef } from 'react';
import Button from './Button';
import weatherLogo from '../assets/images/Logo.svg';

function SwitchButton (props) {
    let ellipseRef = useRef(null);

    const handleClick = () => {
        props.setConvertToFahrenheit(!props.convertToFahrenheit);
        ellipseRef.current.classList.toggle('switch-button__ellipse--on');
    };

    return (
    <button 
        onClick={handleClick}
        type="button"
        className="switch-button"
    >
        <span ref={ellipseRef} className="switch-button__ellipse"></span>
        <span className="switch-button__letter switch-button--celsius">C</span>
        <span className="switch-button__letter switch-button--fahrenheit">F</span>
    </button>    
    );
}

function Weather(props) {
    let [convertToFahrenheit, setConvertToFahrenheit] = useState(false);
    let {
        id,
        weather, 
        description, 
        locationName, 
        temperature, 
        humidity,
    } = props.weatherData;

	return (
    <section className="glass-container weather">
        <img src={weatherLogo} alt="placeholder" className="weather__icon" />

        <div className="weather__top">
            <h2 className="weather__main">{weather}</h2>
            <h3 className="weather__description fw-light">{description}</h3>
        </div>

        <div className="weather-flex-wrapper">
            <div className="weather__item weather__item--left fw-bold">
                <p>{locationName}</p>
                <p>Humidity: <span className="fw-light">{humidity}%</span></p>
            </div>
            <div className="weather__item">
                <p className="weather__temperature fw-light text-center">
                    {!convertToFahrenheit 
                        ? Math.round(temperature) 
                        : Math.round((temperature * 9 / 5) + 32)
                    }
                    °
                    {convertToFahrenheit ? 'F' : 'C'}
                </p>
                <SwitchButton 
                    convertToFahrenheit={convertToFahrenheit} 
                    setConvertToFahrenheit={setConvertToFahrenheit} 
                />
            </div>
        </div>

        <div className="text-center">
            <Button handleClick={() => props.setPrintComponent('location')}>
                <span className="button__item button__icon">⟵</span>
                <span className="button__item">Back</span> 
            </Button>
        </div>
    </section>
	);
}

export default Weather;