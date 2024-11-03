import ItemsList from './itemslist';
import useFetch from './usefetch';
import Header from './Header.js'
import Categories from './categories.js';
import { useEffect, useState, useContext} from 'react';
import { DataContext } from './context.js';
import React from 'react';
import Sales from './sales.js';
import { CartContext } from "./cartcontext";


const Home = () => {
    const [itemlist,setItemList] = useState(false);
    const url = "http://localhost/webshop-apis/getdata.php";

    const url2 = "http://localhost/webshop-apis/getsales.php"
    const {items : sales,isPending2,error2} = (useFetch(url2));

    const isHome = true;
    const {items : data,isPending,error} = (useFetch(url));
    const [{search,setSearch},{items, setItems},{recomendations,setRecomendations}] = useContext(DataContext);
    const [change,setChange] = useState(false);

    const [{items : cartItems,setItems : setCartItems}] = useContext(CartContext);
    const [isAdded,setIsAdded]= useState(false);

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
      if(items !== data && search !== null && search !== ""){
        setRecomendations(items.map(
          (item)=>item
        ));
      }
    },[items]);

    if(data !== null){
      if(change === true){
        setItems(data.filter((item)=>
          item.name.toLowerCase().includes(search.toLowerCase())
        ));
        setChange(false);
      }
    }
    

    const handleItemList = (bool)=>{
      setItemList(bool);
    }

    const handleSale = (sale) =>{
      setItems(data.filter((item)=>item.sale.trim() === sale));
      handleItemList(true);
  }

  const handleCart = (e,item) =>{
    if(cartItems !== null) {
        const add=e.target.value;
        if(add === "Add To Cart") {
          const cart = cartItems;
          cart.push({...item,"quantity":1});
          localStorage.setItem('cartItems',JSON.stringify(cart));
        }
    } else{
      localStorage.setItem('CartItems',JSON.stringify([{...item,"quantity":1}]));
      setCartItems([{...item,"quantity":1}]);
    }
    setIsAdded(!isAdded);
  }

  function checkIfAdded(item) {
    let products = cartItems;
    if(products === null) {
      products=[];
    }
    let checked=false;
    products.forEach(element => {
      if(element.id === item.id){
        checked=true;
      }
    })
    return checked;
  }


    return ( 
        <div>
          <Header  handleItemList={handleItemList} handleCart={handleCart} checkIfAdded={checkIfAdded} />
          <Categories handleItemList={handleItemList} />
          <div>
            {error2 && <div>{error}</div>}     
            {isPending2 && <div>Loading....</div>}
            
            {itemlist && items && <ItemsList items = {items} title = "My Items" isHome={isHome} handleCart={handleCart} checkIfAdded={checkIfAdded}  />} 
            {!itemlist && sales && <Sales
             handleSale={handleSale} sales={sales} items={items}error={error2} />}
            
          </div>
        </div>
     );
}

export default Home;