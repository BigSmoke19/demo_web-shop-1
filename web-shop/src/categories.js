import { Link } from "react-router-dom";

const Categories = () => {
    return (  
        <nav>
            <Link className="link" to="/">Home</Link>
            <Link className="link" to="Create">Create</Link>
        </nav>
    );
}
 
export default Categories;