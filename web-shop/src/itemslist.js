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
    const [isAdded,setIsAdded]=React.useState(false)
    const [quantities,setQuantities]=React.useState(Array.from(items).map(item=>({id:item.id,quantity:1})))
    const [displayQuantity,setDisplayQuantity]=React.useState(0)
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
    const handleCart = (e,item) =>{
      if(JSON.parse(localStorage.getItem('items')) !== null) {
          const add=e.target.value
          if(add === "Add To Cart" && !isAdded) {
            const cart = JSON.parse(localStorage.getItem('items'))
            cart.push(item)
            localStorage.setItem('items',JSON.stringify(cart))
            JSON.parse(localStorage.getItem('items')).forEach(item=>{
            })
          }
      } else{
        localStorage.setItem('items',JSON.stringify([item]));
      }
      setIsAdded(true)
    }

    function checkIfAdded(item) {
      let products=JSON.parse(localStorage.getItem('items'))
      if(products === null) {
        products=[]
      }
      let checked=false
      products.forEach(element => {
        if(element.id === item.id){
          checked=true
        }
      })
      return checked
    }

    return ( 
        <div>
           <h2>{title}</h2>
           <div className={!isAdded?"cart-side-bar":"cart-side-bar open-cart-side-bar"}>
              <h1 style={{color:"white"}}>My Cart</h1>
              <button className="cancel-cart-bar" onClick={()=>setIsAdded(false)}>x</button>
              <div className="cart-side-bar-items">
                  {Array.from(JSON.parse(localStorage.getItem('items'))).map(item=>(
                    <div className="cart-side-bar-item" key={item.id}>
                      <div style={{backgroundColor:"lightblue"}}>
                        <img src={`data:image/jpeg;base64,${item.image}`} className="cart-side-bar-item-image" />
                      </div>
                      <div className="inner-container" style={{backgroundColor:"lightpink"}}>
                        <div className="cart-side-bar-item-inner">
                          <p>{item.name}</p>
                          <p>x</p>
                        </div>
                        <div className="cart-side-bar-item-inner">
                          <div className="bottom-inner-container">
                            <button className="plus-button">+</button>
                            <button>{quantities.forEach((quantity)=>{
                              if(quantity.id === item.id) {
                                setDisplayQuantity(quantity.quantity)
                                return
                              }
                            })}{displayQuantity}</button>
                            <button className="minus-button">-</button>
                            <p style={{padding:"0",margin:"0"}}>{item.price}</p>
                          </div>
                          <div>
                            <p>price</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="cart-sidebar-bottom">
                    <button>
                      View Cart
                    </button>
                    <button>
                      Checkout
                    </button>
                    <p>total:</p>
                  </div>
              </div>
           </div>
\          <div className="display-items">
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
                          {isHome && <button className={"add-to-cart"} value={checkIfAdded(item)?"Added":"Add To Cart"}
                            onClick={(e)=>handleCart(e,item)}>
                            {checkIfAdded(item)?"Added":"Add To Cart"}
                          </button>}
                    </div>
                </div>
              ))}
          </div>
        </div>
      );
}
 
export default ItemsList;