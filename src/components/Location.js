import { useState, useRef, useEffect } from 'react';
import weatherLogo from '../assets/images/Logo.svg';
import CustomSelect from './CustomSelect';
import Coordinates from './Coordinates';
import { fadeNode } from '../modules/fadeNode';

/*
    # Goal (high-level)
    Build the Coordinates component to allow the user to type custom 
    coordinates.

    - Create Coordinates component which holds the latitude and 
    longitude fields. This component should be printed along
    side CustomSelect, but it is hidden from the page using
    CSS. 
    - Add two buttons which allow the page to show and hide
    either CustomSelect and Coordinates components using CSS.
    The animation should move the components from right to
    left
*/
/*
    # low-level

    - define two state variables form holding the latitude and longitude
    input value.
    - define a ref variable "showCustomSelectRef" which represents what 
    component is shown, and use it to show and hide each component. 
    - CustomSelect and Coordinates components could be enclosed in a div
    with two buttons (one for changing that field to view and the other
    for submitting the information) abd their parent element could be
    a grid to be able to place one of them to the right side of the 
    screen.
    
*/

function Location() {
    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    let [showCustomSelect, setShowCustomSelect] = useState(true);

    let customSelectRef = useRef(null);
    let coordinatesRef = useRef(null);
    let changeBtnRef = useRef(null);

    const changeField = () => {
        // fade out customSelectRef
        if (showCustomSelect) {
            fadeNode(customSelectRef, 'fade-out-left', 'fade-in-left', () => setShowCustomSelect(false));
            fadeNode(changeBtnRef, 'fade-out-left', 'fade-in-left', () => {
                changeBtnRef.current.textContent = 'Select Location';
                fadeNode(changeBtnRef, 'fade-in-left', 'fade-out-left', null);
            });

        // fade out coordinatesRef
        } else {
            fadeNode(coordinatesRef, 'fade-out-left', 'fade-in-left', () => setShowCustomSelect(true));
            fadeNode(changeBtnRef, 'fade-out-left', 'fade-in-left', () => {
                changeBtnRef.current.textContent = 'type Coordinates';
                fadeNode(changeBtnRef, 'fade-in-left', 'fade-out-left', null);
            });
        }
    };

    // Fade in coordinates or customSelect component
    useEffect(() => {
        if (!showCustomSelect) {
            coordinatesRef.current.classList.add('fade-in-left');
        } else {
            customSelectRef.current.classList.add('fade-in-left');
        }
    }, [showCustomSelect]);

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
                <div className="location-form__field-container">
                    { showCustomSelect 
                        ? <CustomSelect 
                            ref={customSelectRef}
                            setLatitude={setLatitude} 
                            setLongitude={setLongitude} 
                          />
                        : <Coordinates 
                            ref={coordinatesRef}
                            latitude={latitude}
                            longitude={longitude}
                            setLatitude={setLatitude} 
                            setLongitude={setLongitude} 
                          />
                    }
                </div>
                <div className="text-center">
                    <button 
                        ref={changeBtnRef}
                        type="button" 
                        className="btn" 
                        onClick={changeField} 
                        tabIndex="0"
                    >
                        type coordinates
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Location;