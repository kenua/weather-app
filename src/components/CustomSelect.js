import { useState, useRef, forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import optionsData from '../assets/dropdownData.json';

const showVariants = {
    initial: { 
        opacity: 0,
    },
    animate: { 
        opacity: 1, 
        transition: {
            duration: 0.25
        },
    },
    exit: { 
        opacity: 0,
        transition: {
            duration: 0.25
        },
    },
};
const rotateVariant = {
    pointDown: {
        transform: 'rotateX(0deg)',
    },
    pointUp: {
        transform: 'rotateX(180deg)',
    },
};

const Options = forwardRef((props, ref) => {
    let { id, selectOption } = props;
    let optionsList = null;

    // place selected option as first element
    if (id) {
        let selectedOption = null;
        let options = [];

        optionsData.forEach(optionObj => {
            if (optionObj.id === id) {
                selectedOption = optionObj;
            } else {
                options.push(optionObj);
            }
        });

        optionsList = [selectedOption, ...options];
    } else {
        optionsList = [...optionsData];
    }

    return (
        <ul 
            ref={ref} 
            className="no-list-style"
            onMouseDown={(e) => selectOption(e.target)}
        >
            { optionsList.map(option => {
                return (
                    <li 
                        key={option.id} 
                        className="select-button-options__option"
                        tabIndex="0" 
                        data-id={option.id} 
                        data-lat={option.lat}
                        data-long={option.long}
                        >
                        {option.name}
                    </li>
                );
            }) }
        </ul>
    );
});

function CustomSelect (props) {
    // # STATE VARIABLES
    let [inputValue, setInputValue] = useState('Select Location');
    let [showOptions, setShowOptions] = useState(false);
    let [optionId, setOptionId] = useState(null);

    // # REF VARIABLES
    const optionsRef = useRef(null);
    let areOptionsOpen = useRef(false); // used to prevent handleOptionsActions from running on every key press when options are not open

    // # FUNCTIONS
    let closeOptions = () => {
        setShowOptions(false);
        areOptionsOpen.current = false;
        document.activeElement.blur();
    };
    let selectOption = (node) => {
        let { lat, long, id } = node.dataset;

        setInputValue(node.textContent);
        props.setLatitude(lat);
        props.setLongitude(long);
        setOptionId(id);
        closeOptions();
    };
    let handleOptionsActions = function (e) {
        // only run function if showOptions is open
        if (!areOptionsOpen.current) return;

        let key = e.key;
        let focusNode = document.activeElement;

        switch (key) {
            case 'ArrowUp':
                if (focusNode.previousElementSibling) {
                    focusNode.previousElementSibling.focus();
                }
                break;

            case 'ArrowDown':
                if (focusNode.nextElementSibling) {
                    focusNode.nextElementSibling.focus();
                }
                break;
            case 'Enter':
                selectOption(document.activeElement);
                break;
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleOptionsActions);
        return () => window.removeEventListener('keyup', handleOptionsActions);
    }, []);

    // focus first element of Option component
    useEffect(() => {
        if (showOptions && optionsRef.current) {
            optionsRef.current.firstElementChild.focus();
        }
    }, [showOptions]);

    // # METHODS
    const toggleOptions = () => {
        if (showOptions) {
            closeOptions();
        } else {
            setShowOptions(true);
            areOptionsOpen.current = true;
        }
    };

    return (
        <div className="select-button mb">
            <div className="select-button-content button button--ghost">
                <input 
                    type="text" 
                    className="select-button-content__input"
                    tabIndex="0" 
                    onFocus={toggleOptions}
                    value={inputValue}
                    readOnly={true}
                />
                <motion.svg 
                    variants={rotateVariant}
                    animate={showOptions ? 'pointUp' : 'pointDown'}
                    width="15" 
                    height="9" 
                    viewBox="0 0 15 9" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="select-button__icon"
                >
                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M1.14645 1.14645C1.34171 0.951184 1.65829 0.951184 1.85355 1.14645L7.5 6.79289L13.1464 1.14645C13.3417 0.951184 13.6583 0.951184 13.8536 1.14645C14.0488 1.34171 14.0488 1.65829 13.8536 1.85355L7.85355 7.85355C7.65829 8.04882 7.34171 8.04882 7.14645 7.85355L1.14645 1.85355C0.951184 1.65829 0.951184 1.34171 1.14645 1.14645Z" 
                        fill="white" 
                        stroke="white" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </div>
            <AnimatePresence>
                { showOptions &&
                    <motion.div
                        variants={showVariants}
                        initial={"initial"}
                        animate={"animate"}
                        exit={"exit"}
                        className="select-button-options"
                    >
                        <Options ref={optionsRef} id={optionId} selectOption={selectOption} />
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default CustomSelect;