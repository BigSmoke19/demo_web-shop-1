import { useContext, useEffect, useState } from 'react';
import './styles/home/WishList.css';
import { WishListContext } from './wishlistcontext';
const WishList = (props) => {

    //const [items,setItems] = useState((localStorage.getItem('likes'))?JSON.parse(localStorage.getItem('likes')):[{id:0,name:"empty",type:"",image:"",price:0}]);

    const [{items,setItems}] = useContext(WishListContext);

    return ( 
            <div className={props.onWishList?"wish-list wishlist-open":"wish-list"}>
                <div className="cancel-wishlist-button">
                    <button style={{border:"none",backgroundColor:"black"}} onClick={()=>props.setOnWishList(!props.onWishList)}>
                        <p style={{color:"white",fontSize:20,margin:0}}>x</p>
                    </button>
                </div>
                <div className="wishlist-items-container" >
                {Array.from(items).map((item)=>{
                    return (
                        
                             <div className="wishlist-container" key={item.id}>
                                <p className='info'>{item.name} -- {item.type}</p>
                                <img className="wishlist-thumbnail" src={`data:image/jpeg;base64,${item.image}`}/>
                                <p className='info'>{item.price}$</p>
                             </div>
                    )
                })}
                </div>
            </div>
     );
}

export default WishList
 