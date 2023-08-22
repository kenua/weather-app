import { useState, useRef, forwardRef, useEffect } from 'react';
import optionsData from '../assets/dropdownData.json';

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
            className="options" 
            onMouseDown={(e) => selectOption(e.target)}
        >
            { optionsList.map(option => {
                return (
                    <li 
                        key={option.id} 
                        className="options__option" 
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

function CustomSelect(props) {
    // # STATE VARIABLES
    let [inputValue, setInputValue] = useState('Select Location');
    let [showOptions, setShowOptions] = useState(false);
    let [optionId, setOptionId] = useState(null);

    // # REF VARIABLES
    const optionsRef = useRef(null);
    let areOptionsOpen = useRef(false); // used to prevent handleOptionsActions from running on every key press when options are not open

    // # FUNCTIONS
    let selectOption = (node) => {
        let { lat, long, id } = node.dataset;

        setInputValue(node.textContent);
        props.setLatitude(lat);
        props.setLongitude(long);
        setOptionId(id);
        document.activeElement.blur();
        setShowOptions(false);
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

    // define window key events
    useEffect(() => {
        window.addEventListener('keyup', handleOptionsActions);
    }, []);

    // select first dropdown option
    useEffect(() => {
        if (showOptions) {
            let selectedOption = optionsRef.current.firstElementChild
            selectedOption.focus();
        }
    }, [showOptions]);

    // # METHODS
    const toggleOptions = (e) => {
        let parent = e.target.parentElement;

        if (showOptions) {
            setShowOptions(false);
            areOptionsOpen.current = false;
            parent.classList.remove('select-input--open');
        } else {
            setShowOptions(true);
            areOptionsOpen.current = true;
            parent.classList.add('select-input--open');
        }
    };

    return (
        <div className="custom-select">
            <div className="select-input">
                <input 
                    type="text" 
                    className="select-input__input"
                    tabIndex="0" 
                    onClick={toggleOptions}
                    value={inputValue}
                    readOnly={true}
                />
                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-input__icon">
                    <path 
                        fillRule="evenodd" 
                        clipRule="evenodd" 
                        d="M1.14645 1.14645C1.34171 0.951184 1.65829 0.951184 1.85355 1.14645L7.5 6.79289L13.1464 1.14645C13.3417 0.951184 13.6583 0.951184 13.8536 1.14645C14.0488 1.34171 14.0488 1.65829 13.8536 1.85355L7.85355 7.85355C7.65829 8.04882 7.34171 8.04882 7.14645 7.85355L1.14645 1.85355C0.951184 1.65829 0.951184 1.34171 1.14645 1.14645Z" 
                        fill="white" 
                        stroke="white" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        
            { showOptions && <Options ref={optionsRef} id={optionId} selectOption={selectOption} /> }
        </div>
    );
}

export default CustomSelect;