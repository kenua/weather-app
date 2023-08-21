import { useState } from 'react';
import weatherLogo from '../assets/images/Logo.svg';
import CustomSelect from './CustomSelect';

function Location() {
    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);

    return (
        <section className="location wrapper">
            <div className="logo">
                <img
                    src={weatherLogo}
                    className="logo__img"
                    alt="Sun Half Covered By Clouds"
                />
                <h1 className="logo__heading f-nunito">Weather App</h1>
            </div>
            
            <form className="location-form">
                <CustomSelect 
                    setLatitude={setLatitude} 
                    setLongitude={setLongitude} 
                />

                <div className="location-form__select-container">
                    <select name="location-dropdown" className="location-form__select">
                        <option value="">Select Location </option>
                        <option value="new-york">New York</option>
                    </select>
                </div>
            </form>
        </section>
    );
}

export default Location;