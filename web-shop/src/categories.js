import { Link } from "react-router-dom";
import './styles/home/navbar.css'
import { useCookies } from 'react-cookie';
import { DataContext } from "./context";
import { useContext } from "react";
import useFetch from "./usefetch";

const Categories = () => {
    const [cookies] = useCookies(['email']);
    const [{search,setSearch},{items, setItems}] = useContext(DataContext);
    const url = "http://localhost/webshop-apis/getdata.php";
    const {items : intialItems,isPending,error} = (useFetch(url));
    let categories = null;
    if(intialItems !== null){
        categories = intialItems.reduce((acc, item) => {
            if (!acc.includes(item.type)) {
              acc.push(item.type);
            }
            return acc;
          }, []);
    }

    const handleCategory = (category) =>{
        setItems(intialItems.filter((item)=>item.type === category));
    }

    return (  
        <nav>
            <div className="left-navbar"></div>
            <div className="categories">
                {categories && categories.map((cat)=>
                <p className="link" onClick={()=>handleCategory(cat)}>{cat}</p>)}
            </div>
            <div className="right-navbar"></div>
        </nav>
    );
}
 
export default Categories;