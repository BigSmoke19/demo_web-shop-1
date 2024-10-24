import React, { useState,useEffect } from "react";
import './styles/home/listItems.css';
import { useNavigate } from "react-router-dom";

const ItemsList = (props) => {

    const [likes,setLikes]=React.useState(
      (localStorage.getItem('likes'))?JSON.parse(localStorage.getItem('likes')):[]
    );

    const [items,setItems] = useState(props.
    items.map((item)=>{
        return {...item,isWishListed: (likes.includes(parseInt(item.id)))?true:false};
      }));
    // console.log(JSON.stringify(items[0]));

    const [isRed,setIsRed]=React.useState(false);
    const [isKey,setIsKey]=React.useState(null);
    const [isAdded,setIsAdded]=React.useState(false)
    const isHome = props.isHome;
    const history = useNavigate();
    let isAdmin = false;

    useEffect(()=>{
      localStorage.setItem('likes',JSON.stringify(likes));
    },[likes])

    console.log(likes);
    let [dislike,setDisLike]=React.useState(false)

    if(localStorage.getItem('isadmin') === "1"){
        isAdmin = true;
    };  

    function handleMouseEnter(id) {
      setIsKey(id);
      setIsRed(true);
    };

    function handleMouseLeave() {
      setIsKey(null);
      setIsRed(false);
      setDisLike(false);
    };

    const handleCart = (e,item) =>{
      if(JSON.parse(localStorage.getItem('items')) !== null) {
          const add=e.target.value
          let total=0
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

    function checkIfAdded(item) {
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
        console.log(likes);
        localStorage.setItem('likes',likes);
    }
    
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
          isWishListed.push(parseInt(item.id));
        }
      });
      setLikes(isWishListed);
      };
    // <img src="/images/icons/red-wishlist-icon.png" className="like-icon"/>
    // <img src="/images/icons/heart-icon.png" className="like-icon"/>
    return ( 
        <div>
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