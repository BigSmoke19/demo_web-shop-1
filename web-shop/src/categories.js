import { Link } from "react-router-dom";
import './styles/home/navbar.css'
import { useCookies } from 'react-cookie';
const Categories = () => {
    const [cookies] = useCookies(['email']);
    return (  
        <nav>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="Create">Create</Link>
            {!cookies.email && <Link className="link" to="LogIn">Log In</Link>}
            {cookies.email && <p className="link">{cookies.email}</p>}
        </nav>
    );
}
 
export default Categories;