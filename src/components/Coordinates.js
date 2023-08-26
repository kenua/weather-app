import { useEffect, forwardRef } from 'react';

const Coordinates = forwardRef((props, ref) => {
    let { latitude, setLatitude, longitude, setLongitude } = props;

    const liftLabel = (e) => {
        let label = e.target.previousElementSibling;
        label.classList.add('label-input__label--lift');
    }
    
    const dropLabel = (e) => {
        let label = e.target.previousElementSibling;
        label.classList.remove('label-input__label--lift');
    }

    // use this function in other occation
    const convertStrToNumber = (str) => {
        let coordinateRegExp = /^-?[0-9]+\.?[0-9]*$/;
        return str.match(coordinateRegExp) ? +str : 0;
    };

    // reset latitude and longitude when component is mounted
    useEffect(() => {
        setLatitude(0);
        setLongitude(0);
    }, []);

    return (
        <div ref={ref} className="coordinates">
            <div className="coordinates__item label-input">
                <label htmlFor="latitude" className="label-input__label">Latitude</label>
                <input 
                    type="number" 
                    id="latitude" 
                    className="label-input__input input input--coordinates" 
                    onFocus={liftLabel} 
                    onBlur={dropLabel}
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
            </div>
            <div className="coordinates__item label-input">
                <label htmlFor="longitude" className="label-input__label">Longitude</label>
                <input 
                    type="number" 
                    id="longitude" 
                    className="label-input__input input input--coordinates" 
                    onFocus={liftLabel} 
                    onBlur={dropLabel} 
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                />
            </div>
        </div>
    );
});

export default Coordinates;