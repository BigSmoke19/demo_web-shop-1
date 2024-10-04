import { Link } from "react-router-dom";
import './styles/home/navbar.css'
import { useCookies } from 'react-cookie';
const Categories = () => {
    const [cookies] = useCookies(['email']);
    return (  
        <nav>
            <div className="left-navbar"></div>
            <div className="categories">
                <Link className="link" to="/">Home</Link>
            </div>
            <div className="right-navbar"></div>
        </nav>
    );
}
 
export default Categories;