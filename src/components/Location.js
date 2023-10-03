import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import weatherLogo from '../assets/images/Logo.svg';
import Button from './Button';
import CustomSelect from './CustomSelect';
import Coordinates from './Coordinates';

const fadeVariants = {
    initial: {
        opacity: 0,
        x: -300,
    },
    fadeIn: {
        opacity: 1,
        x: 0,
        transition: { delay: .5 },
    },
    fadeOut: {
        opacity: 0,
        x: -300,
        transition: { type: 'easeInOut' },
    }
};

const buttonVariants = {
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
const textVariants = {
    initial: {
        opacity: 1,
    },
    fadeOut: {
        opacity: [1, 0, 1]
    },
    fadeIn: {
        opacity: [0, 1]
    },
};

function Location(props) {
    let [latitude, setLatitude] = useState('');
    let [longitude, setLongitude] = useState('');
    let [showCustomSelect, setShowCustomSelect] = useState(true);
    let [showWeatherBtn, setShowWeatherBtn] = useState(false);

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
    <motion.div
        variants={fadeVariants}
        initial={"initial"}
        animate={"fadeIn"}
        exit={"fadeOut"}
        className="center"
        style={{ display: 'inherit'}}
    >
        <section className="glass-container">
            <img
                src={weatherLogo}
                className="logo"
                alt="Sun Half Covered By Clouds"
            />
            <h1 className="app-name text-center">Weather App</h1>

            {/* LOCATION/COORDINATES FIELDS */}
            <AnimatePresence mode="wait">
                {showCustomSelect && (
                    <motion.div
                        key="CustomSelect"
                        variants={buttonVariants}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                    >
                        <CustomSelect
                            setLatitude={setLatitude} 
                            setLongitude={setLongitude} 
                        />
                    </motion.div>
                )}
                {!showCustomSelect && (
                    <motion.div
                        key="Coordinates"
                        variants={buttonVariants}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                    >
                        <Coordinates 
                            latitude={latitude}
                            longitude={longitude}
                            setLatitude={setLatitude} 
                            setLongitude={setLongitude} 
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CHANGE FIELD BUTTON */}
            <AnimatePresence mode="wait">
                <Button handleClick={changeField}>
                    {showCustomSelect && (
                        <motion.span
                            key="typeCoordinates"
                            variants={textVariants}
                            initial={"initial"}
                            animate={"fadeIn"}
                            exit={"fadeOut"}
                            className="button__item"
                        >
                        type coordinates
                        </motion.span>
                    )}
                    {!showCustomSelect && (
                        <motion.span
                            key="selectLocation"
                            variants={textVariants}
                            initial={"initial"}
                            animate={"fadeIn"}
                            exit={"fadeOut"}
                            className="button__item"
                        >
                        select location
                        </motion.span>
                    )}
                    <span className="button__item button__icon">→</span>
                </Button>
            </AnimatePresence>

            <div className="mb"/>
            
            {/* GET WEATHER BUTTON  */}
            <AnimatePresence>
                {(showWeatherBtn &&
                    <motion.div className="text-center"
                        variants={buttonVariants}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                    >
                        <Button handleClick={() => props.printWeather(latitude, longitude)}>
                            <span className="button__item">get weather</span> 
                            <span className="button__item button__icon">⟶</span>
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    </motion.div>
    );
}

export default Location;