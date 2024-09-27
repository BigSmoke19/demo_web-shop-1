import React from "react";
import './styles/home/listItems.css';
import { useNavigate } from "react-router-dom";
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
    const history = useNavigate();
    let isAdmin = false;
    if(localStorage.getItem('isadmin') === "1"){
        isAdmin = true;
    }  

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
          let total=0
          if(add === "Add To Cart" && !isAdded) {
            const cart = JSON.parse(localStorage.getItem('items'));
            cart.push({...item,"quantity":1});
            localStorage.setItem('items',JSON.stringify(cart));
            JSON.parse(localStorage.getItem('items')).forEach(item=>{
              total+=item.price;
            })
            console.log(total);
            localStorage.setItem('total',total);
            localStorage.setItem('quantity',JSON.parse(localStorage.getItem('items')).length);
          }
      } else{
        localStorage.setItem('items',JSON.stringify([{...item,"quantity":1}]));
        //console.log(localStorage.getItem('items'));
      }
      setIsAdded(!isAdded);
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

    const handleEdit = (item) =>{
      localStorage.setItem('editItem',JSON.stringify(item));
      history("/edit");
    }

    return ( 
        <div>
           <h2>{title}</h2>
           <div className={!isAdded?"cart-side-bar":"cart-side-bar open-cart-side-bar"}>
              <button className="cancel-cart-bar" onClick={()=>setIsAdded(false)}>x</button>
              <h1 style={{color:"white"}}>{localStorage.getItem('total')}</h1>
              <h1 style={{color:"white"}}>{localStorage.getItem('quantity')}</h1>
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
                          {isAdmin && <button className={"add-to-cart"} onClick={()=>handleEdit(item)}>Edit</button>}
                    </div>
                </div>
              ))}
          </div>
        </div>
      );
}
 
export default ItemsList;