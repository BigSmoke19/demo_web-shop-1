import './styles/home/navbar.css'
import { DataContext } from "./context";
import { useContext, useEffect, useState } from "react";
import useFetch from "./usefetch";

const Categories = ({handleItemList}) => {

    const [{search,setSearch},{items, setItems}] = useContext(DataContext);

    const url = "http://localhost/webshop-apis/getdata.php";
    const {items : intialItems,isPending,error} = (useFetch(url));

    const [categories,setCategories] = useState(null);

    useEffect(()=>{
        if(intialItems !== null){
            setCategories(intialItems.reduce((categoriesList, item) => {
                if (!categoriesList.includes(item.type)) {
                  categoriesList.push(item.type);
                }
                return categoriesList;
              }, [])
            );
        }
        
    },[intialItems])



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