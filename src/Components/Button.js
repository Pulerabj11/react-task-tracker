import PropTypes from 'prop-types'

//Button component to be used in the Header.js component
const Button = ({color, text, onClick}) => {
    return <button className='btn' onClick={onClick} style={{backgroundColor: color}}>{text}</button>
}

//Lowercase propTypes is a property I'm adding to Header.
//Uppercase PropTypes is an object with many definitions I can use to apply to a prop.
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button