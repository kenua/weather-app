import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';
import weatherLogo from '../assets/images/Logo.svg';
import sunIcon from '../assets/images/sunIcon.svg';
import rainIcon from '../assets/images/rainIcon.svg';
import fewCloudsIcon from '../assets/images/fewCloudsIcon.svg';
import cloudsIcon from '../assets/images/cloudsIcon.svg';
import drizzleIcon from '../assets/images/drizzleIcon.svg';
import thunderstormIcon from '../assets/images/thunderstormIcon.svg';

const fadeVariants = {
	initial: { 
		opacity: 0,
		x: 300, 
	},
	fadeIn: { 
		opacity: 1, 
		x: 0,
		transition: { delay: .5, }
	},
	fadeOut: { 
		opacity: 0,
		x: 300,
        transition: { type: 'easeInOut' },
	},
}

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

    // select icon based on id variable
    let icon = weatherLogo;

    if (id >= 200 && id <= 232) {
        icon = thunderstormIcon;
    } else if (id >= 300 && id <= 331) {
        icon = drizzleIcon;
    } else if (id >= 500 && id <= 531) {
        icon = rainIcon;
    } else if (id >= 600 && id <= 622) {
        // snow missing
    } else if (id >= 701 && id <= 781) {
        // fog missing
    } else if (id === 800) {
        icon = sunIcon;
    } else if (id >= 801 && id <= 802) {
        icon = fewCloudsIcon;
    } else if (id >= 803 && id <= 804) {
        icon = cloudsIcon;
    }

	return (
    <motion.div
        variants={fadeVariants}
        initial={"initial"}
        animate={"fadeIn"}
        exit={"fadeOut"}
        className="center"
    >
        <section className="glass-container weather">
            <img src={icon} alt="placeholder" className="weather__icon" />

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
                <Button handleClick={() => props.printLocation()}>
                    <span className="button__item button__icon">⟵</span>
                    <span className="button__item">Back</span> 
                </Button>
            </div>
        </section>
    </motion.div>
	);
}

export default Weather;