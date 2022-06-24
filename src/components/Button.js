import PropTypes from 'prop-types'

const Button = ({color,  text, onclick}) => {
  return   <button onClick={onclick} style={{ backgroundColor:color}} className='btn'>{text}</button>
}

Button.defaultProps = {
   color:'steelblue'
}

// defining the prop types and insuring that it is a string and exists
Button.propTypes = {
    color: PropTypes.string,
    text: PropTypes.string,
    onclick: PropTypes.func,
}


export default Button
