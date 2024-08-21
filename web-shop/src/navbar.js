import {Link} from 'react-router-dom';
const NavBar = () => {
    return (  
        <div className="NavBar">
            <h2>Web Shop</h2>
            <Link className='links' to="/" id='link'>Home</Link>
            <Link className='links' to="/create" id='link'>Add Item</Link>
        </div>
    );
}
 
export default NavBar;