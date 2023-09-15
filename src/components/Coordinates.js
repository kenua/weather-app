import { forwardRef } from 'react';

const Coordinates = forwardRef((props, ref) => {
    let { latitude, setLatitude, longitude, setLongitude } = props;

    const liftLabel = (e) => {
        let label = e.target.previousElementSibling;
        e.target.classList.add('input-box__input--visible');
        label.classList.add('input-box__label--lift');
    }
    
    const dropLabel = (e) => {
        let input = e.target;
        let label = input.previousElementSibling;

        if (input.value.length === 0) {
            input.classList.remove('input-box__input--visible');
            label.classList.remove('input-box__label--lift');
        }
    }

    // use this function in other occation
    const convertStrToNumber = (str) => {
        let coordinateRegExp = /^-?[0-9]+\.?[0-9]*$/;
        return str.match(coordinateRegExp) ? +str : 0;
    };

    return (
        <div ref={ref} className="coordinates">
            <div className="coordinates__item input-box">
                <label htmlFor="latitude" className="input-box__label">Latitude</label>
                <input 
                    type="number" 
                    id="latitude" 
                    className="input-box__input btn" 
                    onFocus={liftLabel} 
                    onBlur={dropLabel}
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                />
            </div>
            <div className="coordinates__item input-box">
                <label htmlFor="longitude" className="input-box__label">Longitude</label>
                <input 
                    type="number" 
                    id="longitude" 
                    className="input-box__input btn" 
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