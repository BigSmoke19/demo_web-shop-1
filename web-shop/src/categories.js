import './styles/home/navbar.css'
import { useCookies } from 'react-cookie';
import { DataContext } from "./context";
import { useContext } from "react";
import useFetch from "./usefetch";

const Categories = ({handleItemList}) => {
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
        handleItemList(true);
    }

    return (  
        <div className='categories'>
            <div className="category" onClick={()=>{setItems(intialItems);handleItemList(true)}}>All</div>
            <div className="category" onClick={()=>{setItems(intialItems);handleItemList(false)}}>Sales</div>
            {categories && categories.map((cat)=>
            <div className="category" onClick={()=>handleCategory(cat)}>{cat}</div>)}
        </div>
    );
}
 
export default Categories;