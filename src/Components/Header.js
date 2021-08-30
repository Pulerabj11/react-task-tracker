//Created the base component code from ES7 React/Redux/GraphQL/React-Native snippets extension (type 'rafce' to create this code)
//Assume the same for other components unless specified.
//import React used to be required.  No longer necessary

//Use PropTypes to make code more rebust and catch errors.  Now title must be a string.
//It is essentially a runtime validation of the props you are using.
import PropTypes from 'prop-types'
import Button from './Button'


//Components take in a props object consisting of the props you pass in.  I destructured props to specify which prop I'm taking in.  
const Header = ({title, onAdd, showAdd}) => {
    return (
        <header className='header'>
            <h1>{title}</h1>
            {/* Toggle button to open the input for a new task*/}
            <Button 
                color={showAdd ? 'Red' : 'Green'}  //if showAdd is true, color button red, else Green
                text={showAdd ? 'Close' : 'Add'}  //if showAdd is true, button says Close, else Add
                onClick={onAdd}  //boolean state setShowAddTask in App.js gets flipped
            /> 
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker',
}

//Lowercase propTypes is a property I'm adding to Header.
//Uppercase PropTypes is an object with many definitions I can use to apply to a prop.
Header.propTypes = {
    //Using .isRequired specifies this component must have a title.
    title: PropTypes.string.isRequired,
}

export default Header
