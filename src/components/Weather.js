function Weather(props) {
    let {
        weather, 
        description, 
        locationName, 
        temperature, 
        humidity,
    } = props.weatherData;

	return (
    <section className="glass-container">
        <p>{weather}</p>
        <p>{description}</p>
        <p>{locationName}</p>
        <p>{temperature}</p>
        <p>{humidity}</p>
    </section>
	);
}

export default Weather;