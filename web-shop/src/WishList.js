import { useContext, useEffect, useState } from 'react';
import './styles/home/WishList.css';
import { WishListContext } from './wishlistcontext';
const WishList = (props) => {

    //const [items,setItems] = useState((localStorage.getItem('likes'))?JSON.parse(localStorage.getItem('likes')):[{id:0,name:"empty",type:"",image:"",price:0}]);
    const [{items : likes,setItems : setLikes}] = useContext(WishListContext); 
    const [{items : wishlistItems,setItems}] = useContext(WishListContext);

    const likedIds = likes.map((liked)=>{
        return liked.id;
      });
  
      const items = 
      wishlistItems.map((item)=>{
          return {...item,isWishListed: (likedIds.includes(item.id))?true:false};
        });
        console.log(items.length);
      // console.log(JSON.stringify(items[0]));
  
  
      const [isAdded,setIsAdded]= useState(false);

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

    const handleCart = (e,item) =>{
        if(JSON.parse(localStorage.getItem('items')) !== null) {
            const add=e.target.value;
            let total=0;
            if(add === "Add To Cart") {
              const cart = JSON.parse(localStorage.getItem('items'));
              cart.push({...item,"quantity":1});
              localStorage.setItem('items',JSON.stringify(cart));
              JSON.parse(localStorage.getItem('items')).forEach(item=>{
                total+=item.price;
              })
              localStorage.setItem('total',total);
              localStorage.setItem('quantity',JSON.parse(localStorage.getItem('items')).length);
            }
        } else{
          localStorage.setItem('items',JSON.stringify([{...item,"quantity":1}]));
          //console.log(localStorage.getItem('items'));
        }
        setIsAdded(!isAdded);
      }
  
      const checkIfAdded = (item) => {
        let products=JSON.parse(localStorage.getItem('items'));
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
                            {<button className={"add-to-cart"} value={checkIfAdded(item)?"Added":"Add To Cart"}
                                    onClick={(e)=>handleCart(e,item)}>
                                    {checkIfAdded(item)?"Added":"Add To Cart"}
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
 