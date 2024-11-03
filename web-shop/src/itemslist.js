import React, {useEffect,useContext} from "react";
import  './styles/home/listItems.css';
import { useNavigate } from "react-router-dom";
import { UserContext } from "./usercontext";
import { WishListContext } from "./wishlistcontext";

const ItemsList = (props) => {

    const [{items : likes,setItems : setLikes}] = useContext(WishListContext);
     

    const likedIds = likes.map((liked)=>{
      return liked.id;
    });

    const items = props.
    items.map((item)=>{
        return {...item,isWishListed: (likedIds.includes(item.id))?true:false};
      });

    const history = useNavigate();

    const [{useremail,setUserEmail},{isadmin,setIsAdmin}] = useContext(UserContext);

    useEffect(()=>{
      localStorage.setItem('likes',JSON.stringify(likes));
    },[likes])

    
    const handleZoomImage = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left; // X coordinate of the cursor in the container
        const y = e.clientY - rect.top;  // Y coordinate of the cursor in the container

        // Calculate the percentage of the cursor's position within the container
        const xPercent = (x / e.currentTarget.offsetWidth) * 100;
        const yPercent = (y / e.currentTarget.offsetHeight) * 100;
        // Set the background position dynamically based on the cursor position
        e.currentTarget.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    }
    
    const handleEdit = (item) =>{
      localStorage.setItem('editItem',JSON.stringify(item));
      history("/edit");
    }

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
        <div className="itemlist" >
          
          <div className="display-items">
              {Array.from(items).map((item) => (
                <div className="item-container" key={item.id}>
                    <div className="thumbnail-container">
                          <img onMouseMove={(e)=>handleZoomImage(e)} className="thumbnail" src={`data:image/png;base64,${item.image}`}/>
                          {<button className="like-button" onClick={()=>handleLiked(item.id)}>
                          {(!item.isWishListed)?
                          <img src="/images/icons/heart-icon.png" className="like-icon"/>:
                          <img src="/images/icons/red-wishlist-icon.png" className="like-icon"/>
                          }
                          </button>}     
                    </div>

                    <div className="detail-container">
                      <div className="details">
                          <p className="item-name">
                              {item.name}
                          </p>
                          <p className="type">
                              {item.type}
                          </p>
                          <p className="price">
                              {item.price}$
                          </p>
                      </div>
                        <div className="buttons">
                        {<button className={"add-to-cart"} value={props.checkIfAdded(item)?"Added":"Add To Cart"}
                            onClick={(e)=>props.handleCart(e,item)}>
                            {props.checkIfAdded(item)?"Added":"Add To Cart"}
                          </button>}
                          {isadmin && <button className={"edit"} onClick={()=>handleEdit(item)}>Edit</button>}
                        </div>
                    </div>
                </div>
              ))}
          </div>
        </div>
      );
}
 
export default ItemsList;