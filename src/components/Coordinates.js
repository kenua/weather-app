function Coordinates(props) {
    let { latitude, setLatitude, longitude, setLongitude } = props;

    return (
        <div>
            <label htmlFor="latitude" className=" coordinate-label">Latitude</label>
            <input 
                type="number" 
                id="latitude" 
                className="button button--ghost mb"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
            />

            <label htmlFor="longitude" className="coordinate-label">Longitude</label>
            <input 
                type="number" 
                id="longitude" 
                className="button button--ghost mb"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
            />
        </div>
    );
};

export default Coordinates;