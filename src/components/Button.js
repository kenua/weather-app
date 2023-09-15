function Button(props) {
    return (
        <button 
            type="button" 
            className="btn" 
            onClick={() => props.handleClick()}
            tabIndex="0"
        >   
            {props.children}
        </button>
    );
}

export default Button;