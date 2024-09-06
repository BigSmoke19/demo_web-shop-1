import { Link } from "react-router-dom";
import './styles/home/navbar.css'

const Categories = () => {
    return (  
        <nav>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="Create">Create</Link>
            <Link className="link" to="SignUp">SignUp</Link>
        </nav>
    );
}
 
export default Categories;