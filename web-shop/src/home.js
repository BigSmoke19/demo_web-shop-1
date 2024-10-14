import ItemsList from './itemslist';
import useFetch from './usefetch';
import Header from './Header.js'
import Categories from './categories.js';
import { useEffect, useState, useContext} from 'react';
import { DataContext } from './context.js';

const Home = () => {
    const url = "http://localhost/webshop-apis/getdata.php";
    const isHome = true;
    const {items : data,isPending,error} = (useFetch(url));
    const [{search,setSearch},{items, setItems},{recomendations,setRecomendations}] = useContext(DataContext);
    const [change,setChange] = useState(false);
    
    
    useEffect(()=>{setItems(data)},[data]);
    useEffect(()=>{
      if(search != null && search !== ""){
        setChange(true);
      }else{
        setItems(data);
        setRecomendations(null);
      }
    },[search]);
    useEffect(()=>{
      if(items !== data){
        setRecomendations(items.map(
          (item)=>item
        ));
      }
    },[items]);

    if(data !== null){
      if(change === true){
        console.log("Searching.....");
        setItems(data.filter((item)=>
          item.name.toLowerCase().includes(search.toLowerCase())
        ));
        setChange(false);
      }
      console.log(recomendations);
    }
    
    return ( 
        <div>
          <Header />
          <Categories />
          <div>
            {error && <div>{error}</div>}     
            {isPending && <div>Loading....</div>}
            {items && <ItemsList items = {items} title = "My Items" isHome={isHome} />}  
          </div>
        </div>
     );
}

export default Home;