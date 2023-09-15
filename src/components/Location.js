import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import weatherLogo from '../assets/images/Logo.svg';
import Button from './Button';
import CustomSelect from './CustomSelect';
import Coordinates from './Coordinates';

const fadeVariants = {
    initial: { 
        opacity: 0,
        x: 100,
    },
    animate: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.25
        },
    },
    exit: { 
        opacity: 0,
        x: -100,
        transition: {
            duration: 0.25
        },
    },
};

function Location() {
    let [latitude, setLatitude] = useState('');
    let [longitude, setLongitude] = useState('');
    let [showCustomSelect, setShowCustomSelect] = useState(true);
    let [showWeatherBtn, setShowWeatherBtn] = useState(false);

    let customSelectRef = useRef(null);
    let coordinatesRef = useRef(null);

    const changeField = () => {
        setShowCustomSelect(!showCustomSelect);
        setLatitude('');
        setLongitude('');
    };

    useEffect(() => {
        if (latitude.length > 0 && longitude.length > 0) {
            setShowWeatherBtn(true);
        } else {
            setShowWeatherBtn(false);
        }
    }, [latitude, longitude]);

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
                    <AnimatePresence mode="wait">
                        {(showCustomSelect && 
                            <motion.div
                                key="1"
                                variants={fadeVariants}
                                initial={"initial"}
                                animate={"animate"}
                                exit={"exit"}
                            >
                                <CustomSelect 
                                    ref={customSelectRef}
                                    setLatitude={setLatitude} 
                                    setLongitude={setLongitude} 
                                />
                            </motion.div>
                        )}
                        {(!showCustomSelect && 
                            <motion.div
                                key="2"
                                variants={fadeVariants}
                                initial={"initial"}
                                animate={"animate"}
                                exit={"exit"}
                            >
                                <Coordinates 
                                    ref={coordinatesRef}
                                    latitude={latitude}
                                    longitude={longitude}
                                    setLatitude={setLatitude} 
                                    setLongitude={setLongitude} 
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                    {(showCustomSelect && 
                        <motion.div className="text-center"
                            key="1"
                            variants={fadeVariants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                        >
                            <Button handleClick={changeField}>Type Coordinates</Button>
                        </motion.div>
                    )}
                    {(!showCustomSelect && 
                        <motion.div className="text-center"
                            key="2"
                            variants={fadeVariants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                        >
                            <Button handleClick={changeField}>Select Location</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {(showWeatherBtn &&
                        <motion.div className="text-center"
                            variants={fadeVariants}
                            initial={"initial"}
                            animate={"animate"}
                            exit={"exit"}
                        >
                            <Button handleClick={() => { console.log('hello') }}>Get Weather</Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </form>
        </section>
    );
}

export default Location;