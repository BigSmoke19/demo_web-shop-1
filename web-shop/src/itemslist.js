import React from "react";
import './styles/home/listItems.css';

const ItemsList = (props) => {

    const items = props.items;
    const title = props.title;
    const url = "http://localhost:8000/items/";
    const [isRed,setIsRed]=React.useState(false);
    const [isKey,setIsKey]=React.useState(null);
    const [likes,setLikes]=React.useState([]);
    const [dislike,setDisLike]=React.useState(false)
    const isHome = props.isHome;

    function handleMouseEnter(id) {
      setIsKey(id)
      setIsRed(true)
    }

    function handleMouseLeave() {
      setIsKey(null)
      setIsRed(false)
      setDisLike(false)
    }

    function handleLikeClick(id) {
        if(likes.includes(id)) {
          setLikes(likes.filter((like)=>like!==id))
          setDisLike(true);
        } else{
            setLikes([
              ...likes,
              id
            ]);
          }
    }
    const handleCart = (item) =>{
      if(localStorage.getItem('items') !== null){
        const cart = JSON.parse(localStorage.getItem('items'));
        cart.push(item);
        localStorage.setItem('items',JSON.stringify(cart));
      }
      else{
        localStorage.setItem('items',JSON.stringify([item]));
      }
    }

    return ( 
        <div>
          <h2>{title}</h2>
          <div className="display-items">
              {Array.from(items).map((item) => (
                <div className="item-container" key={item.id}>
                    <div className="thumbnail-container">
                          <img className="thumbnail" src={`data:image/jpeg;base64,${item.image}`}/>
                          {<button className="like-button" onClick={()=>handleLikeClick(parseInt(item.id))} onMouseEnter={()=>handleMouseEnter(item.id)} onMouseLeave={()=>handleMouseLeave()}>
                              {!likes.includes(parseInt(item.id)) && (!isRed || isKey!==item.id || dislike) && <img src="/images/icons/heart-icon.png" className="like-icon"/>}
                              {!likes.includes(parseInt(item.id)) && !dislike && (isRed && isKey===item.id) && <img src="/images/icons/red-wishlist-icon.png" className="like-icon"/>}
                              {likes.includes(parseInt(item.id)) && <img src="/images/icons/red-wishlist-icon.png" className="like-icon"/>}
                          </button>}
                    </div>

                    <div>
                          <p className="item-name">
                              {item.name}
                          </p>
                          <p className="type">
                              {item.type}
                          </p>
                          <p className="price">
                              {item.price}$
                          </p>
                          {isHome && <button className="add-to-cart" onClick={()=>handleCart(item)}>Add to cart</button>}
                    </div>
                </div>
              ))}
          </div>
        </div>
      );
}
 
export default ItemsList;