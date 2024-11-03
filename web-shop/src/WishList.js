import { useContext, useEffect, useState } from 'react';
import './styles/home/WishList.css';
import { WishListContext } from './wishlistcontext';
const WishList = (props) => {
;
    const [{items : likes,setItems : setLikes}] = useContext(WishListContext); 
    const [{items : wishlistItems,setItems}] = useContext(WishListContext);

    const likedIds = likes.map((liked)=>{
        return liked.id;
      });
  
      const items = 
      wishlistItems.map((item)=>{
          return {...item,isWishListed: (likedIds.includes(item.id))?true:false};
        });

  

    const handleLiked = (id) =>{

        const objIndex = items.findIndex(obj => obj.id == id);
        items[objIndex].isWishListed = !items[objIndex].isWishListed;
  
        const isWishListed = [];
        items.map((item)=>{
          if(item.isWishListed){
            isWishListed.push(item);
          }
        });
        setLikes(isWishListed);
        };

    return ( 
            <div className={props.onWishList?"wish-list wishlist-open":"wish-list"}>
                <div className="cancel-wishlist-button">
                    <button style={{border:"none",backgroundColor:"black"}} onClick={()=>props.setOnWishList(!props.onWishList)}>
                        <p style={{color:"white",fontSize:20,margin:0}}>x</p>
                    </button>
                </div>
                <div className="wislist-display-items">
                    {Array.from(items).map((item) => (
                        <div className="wislist-item-container" key={item.id}>
                            <div className="wislist-thumbnail-container">
                                <img className="wislist-thumbnail" src={`data:image/png;base64,${item.image}`}/>
                                {<button className="wislist-like-button" onClick={()=>handleLiked(item.id)}>
                                {(!item.isWishListed)?
                                <img src="/images/icons/heart-icon.png" className="wislist-like-icon"/>:
                                <img src="/images/icons/red-wishlist-icon.png" className="wislist-like-icon"/>
                                }
                                </button>}     
                            </div>

                            <div className="wislist-detail-container">
                            <div className="wislist-details">
                                <p className="wislist-item-name">
                                    {item.name}
                                </p>
                                <p className="wislist-type">
                                    {item.type}
                                </p>
                                <p className="wislist-price">
                                    {item.price}$
                                </p>
                            </div>
                                <div className="wislist-buttons">
                            {<button className={"add-to-cart"} value={props.checkIfAdded(item)?"Added":"Add To Cart"}
                                    onClick={(e)=>props.handleCart(e,item)}>
                                    {props.checkIfAdded(item)?"Added":"Add To Cart"}
                                </button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
     );
}

export default WishList
 