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
        <div className='categories'>
            <div className="category" onClick={()=>setItems(intialItems)}>All</div>
            {categories && categories.map((cat)=>
            <div className="category" onClick={()=>handleCategory(cat)}>{cat}</div>)}
        </div>
    );
}
 
export default Categories;