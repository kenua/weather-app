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
            </form>
        </section>
    );
}

export default Location;