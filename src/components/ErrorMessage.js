import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import warning from '../assets/images/warning.svg';
import subtract from '../assets/images/subtract.svg';

const errorVariants = {
    hidden: { opacity: 0, y: -100},
    visible: { opacity: 1, y: 0},
};

function ErrorMessage(props) {
    let { title, desc } = props.errorMessage;

    return (
        <AnimatePresence>
            {props.printError && (
                <motion.div
                    variants={errorVariants}
                    initial={"hidden"}
                    animate={"visible"}
                    exit={"hidden"}
                    className="error-message text-center"
                >
                    <img src={warning} alt="" className="error-message__warning"/>
                    <h2 className="error-message__title">{title}</h2>
                    <Button handleClick={() => props.setPrintError(false)} classNames={'error-message__button'}>
                        <span className="button__item">{desc}</span> 
                        <span className="button__item button__icon">
                            <img src={subtract} alt="" className="error-message__subtract" />
                        </span>
                    </Button>
                </motion.div>
            )}

        </AnimatePresence>
    );
}

export default ErrorMessage;