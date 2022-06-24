//impt to import props types
import PropTypes from "prop-types";
import { useLocation } from 'react-router-dom'
import Button from "./Button";
//rafce to get the snippet to work
const Header = ({ title, onAdd, showAdd }) => {
  const location = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
     {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onclick={onAdd} />}
    </header>
  );
};

// if there was no title passed that would be the default title
Header.defaultProps = {
  title: "Task Tracker",
};

// defining the prop types and insuring that it is a string and exists
Header.propTypes = {
  title: PropTypes.string.isRequired,
};

/* for an inline style you can use the style prop and pass in an object with the style you want to apply : style ={headingStyle} 
const headingStyle ={
    color: '#fff',
    background: '#000',
}*/

export default Header;
