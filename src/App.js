import { useState } from 'react';
import Location from './components/Location';
import BackgroundParticles from './components/BackgroundParticles';
import Loading from './components/Loading';
import Weather from './components/Weather';
import ErrorMessage from './components/ErrorMessage';
import { motion, AnimatePresence } from 'framer-motion';

const weatherVariants = {
	initial: { 
		opacity: 0,
		x: 300, 
	},
	animate: { 
		opacity: 1, 
		x: 0,
		transition: {
			delay: .5,
		}
	},
	exit: { 
		opacity: 0,
		x: 300,
	},
}

function App() {
	let [weatherData, setWeatherData] = useState({
		id: 0,
		weather: '',
		description: '',
		locationName: '',
		temperature: 0,
		humidity: 0,
	});
	let [printComponent, setPrintComponent] = useState('location'); // location, loading, weather
	let [printError, setPrintError] = useState(false);
	let [errorMessage, setErrorMessage] = useState({ title: '', desc: ''});

	const changeThemeColor = (id = 0) => {
		if (id >= 200 && id <= 531) {
			document.body.className = 'theme--blue';
		} else if (id >= 600 && id <= 781) {
			document.body.className = 'theme--purple';
		} else if (id >= 800 && id <= 802) {
			document.body.className = 'theme--yellow';
		} else if (id === 803 || id === 804) {
			document.body.className = 'theme--purple';
		} else {
			document.body.className = '';
		}
	}

	const printWeather = async (latitude = '', longitude = '') => {
		setPrintError(false);

		try {
			validateCoordinates(latitude, longitude);
			setPrintComponent('loading');

			let weather = await fetchWeatherData(latitude, longitude);

			setWeatherData(weather);
			setPrintComponent('weather');
			changeThemeColor(weather.id);
		} catch(error) {
			setPrintError(true);

			if (error.message === 'Could not request weather.') {
				setErrorMessage({
					title: 'request error!',
					desc: 'something went wrong while requesting weather data, please try again later.',
				});
				setPrintComponent('location');
			} else if (error.message.includes('Coordinates are not valid.')) {
				setErrorMessage({
					title: 'coordinates error!',
					desc: 'coordinate are invalid.',
				});
			} else {
				setErrorMessage({
					title: 'error!!',
					desc: 'something went wrong, reload page or try again later.',
				});
			}
		}
	};

	const printLocation = () => {
		changeThemeColor();
		setPrintComponent('location');
	};

	const validateCoordinates = (latitude = '', longitude = '') => {
		let isLatitudeValid = latitude.match(/^-?[0-9]+\.?[0-9]*$/);
		let isLongitudeValid = longitude.match(/^-?[0-9]+\.?[0-9]*$/);

		if (!isLatitudeValid || !isLongitudeValid) {
			throw new Error(`Coordinates are not valid. latitude: ${latitude}, longitude: ${longitude}.`);
		}
	};

	const fetchWeatherData = async (latitude, longitude) => {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
			let res = await fetch(url);
			let data = await res.json();
			let result = {
				id: data.weather[0].id,
				weather: data.weather[0].main,
				description: data.weather[0].description,
				locationName: data.name,
				temperature: data.main.temp,
				humidity: data.main.humidity,
			};

			return result;
		} catch (error) {
			throw new Error('Could not request weather.');
		}
	};

	return (
	<>	
		<ErrorMessage printError={printError} setPrintError={setPrintError} errorMessage={errorMessage} />
		<BackgroundParticles />
		<div className="corner-particle corner-particle--top-right"></div>
		<div className="corner-particle corner-particle--bottom-left"></div>
		<div className="content">
			<AnimatePresence initial={false}>
				{printComponent === 'location' && (
					<motion.div
						key={"Location"}
						initial={{ opacity: 0, x: -300, }}
                        animate={{ opacity: 1, x: 0, transition: { delay: .5 } }}
                        exit={{ opacity: 0, x: -300 }}
						className="center"
						style={{ display: 'inherit'}}
					>
						<Location printWeather={printWeather} />
					</motion.div>
				)}
				{printComponent === 'loading' && (
					<motion.div
						key={"Loading"}
						initial={{ opacity: 0, y: 200 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -200 }}
						className="center"
					>
						<Loading />
					</motion.div>
				)}
				{printComponent === 'weather' && (
					<motion.div
						key={"Weather"}
						variants={weatherVariants}
						initial={"initial"}
						animate={"animate"}
						exit={"exit"}
						className="center"
					>
						<Weather weatherData={weatherData} printLocation={printLocation} />
					</motion.div>	
				)}
			</AnimatePresence>
		</div>
	</>
	);
}

export default App;
