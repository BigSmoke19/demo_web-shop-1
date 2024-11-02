import { useEffect, useState, useContext } from 'react';
import React from 'react'
import './styles/cart/cart.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Header from './Header.js';
import { UserContext } from './usercontext.js';

const Cart = () => {
    const [items,setItems] = useState((localStorage.getItem('items'))?JSON.parse(localStorage.getItem('items')):[]);
    const [total,setTotal] = useState(0);
    const [cookies] = useCookies(['email']);

    const [{useremail : userEmail,setUserEmail},
        {isadmin,setIsAdmin}] = useContext(UserContext);

    const token = process.env.REACT_APP_ORDER_TOKEN;

    const url = "http://localhost/webshop-apis/addorder.php";
    const history = useNavigate();
    
    const [isPending,setIsPending] = useState(false);
    const [error,setError] = useState(null);


    useEffect(()=>{
        localStorage.setItem('items',JSON.stringify(items));
        let newTotal = 0;
        items.map(
            (item) =>{
                newTotal += item.quantity * item.price;
            }
        );
        setTotal(newTotal);
    },[items]);


    const handeleDeleteItem = (id) =>{
        setItems(items.filter((item)=>item.id !== id));
    }

    const handeleQuantity = (sign,id) =>{
        if(sign === "+"){
            const newItems = items.map(
                (item) =>{
                    if(item.id === id){
                        return{...item,quantity:item.quantity+=1};
                    }
                    return item;
                }
            );
            setItems(newItems);
        }else{

            const newItems = items.map(
                (item) =>{
                    if(item.id === id &&  item.quantity > 1){
                        return{...item,quantity:item.quantity-=1};
                    }
                    return item;
                }
            );
            setItems(newItems);
        }
    }

    const handleCheckout = () =>{
        if(userEmail === null){
            setIsPending(false);
            setError("please sign in");
            history("/signin")
        }
        else if(total !== 0){
            setIsPending(true);
            const data = JSON.parse(JSON.stringify(items));
            fetch(url,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify({"data":data,"useremail":userEmail,"total":total,"token":token})
            }).then(
                () =>{
                    setIsPending(false);
                    alert("order marked!");
                    history("/");
                }
            ).catch(err=>{
                setError(err.message);
                setIsPending(false);
            }
            );        
        }
    }
    return (
        <div> 
            <Header />
            <div className="cart">
                <div className="left">
                    <div className="items-container">
                        <div className="items-title">
                            <div className="items-title-left-section">
                                <p className="title-names">PRODUCT</p>
                            </div>
                            <div className='items-title-right-section'>
                                <p className="title-names">PRICE</p>
                                <p className="title-names">QUANTITY</p>
                                <p className="title-names">SUBTOTAL</p>
                            </div>
                        </div>
                        <div className="products">
                            {Array.from(items).map((item=>(
                                <div className="product">
                                    <div className="products-left-section">
                                        <button className="cancel-button" onClick={()=>handeleDeleteItem(item.id)}>X</button>
                                        <img src={`data:image/jpeg;base64,${item.image}`} className="product-thumbnail"/>
                                        <p className={{marginRight:20}}>{item.name}</p>
                                    </div>
                                    <div className="products-right-section">
                                        <p className="official-price">${item.price}</p>
                                        <div className="quantity-contianer" style={{paddingRight:"10px"}}>
                                            <button className="plus-button" onClick={(e)=>handeleQuantity("+",item.id)}>+</button>
                                            <span style={{marginBottom:15}}> {item.quantity} </span>
                                            <button className="minus-button" onClick={(e)=>handeleQuantity("-",item.id)}>-</button>
                                        </div>
                                        <p style={{color:'black',fontSize:17,fontWeight:'bold'}}>${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            )))}
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="order-summary">
                        <h1>Cart Totals</h1>
                        <div className="cart-totals">
                            <p style={{fontWeight:'bold'}}>SubTotal</p>
                            <p>{total}$</p>
                        </div>
                        <div className='cart-totals'>
                            <p style={{fontWeight:'bold'}}>Total</p>
                            <p>{total}$</p>
                        </div>
                        <div className='cart-totals'>
                            <button className="checkout" disabled={isPending} onClick={handleCheckout}>Checkout</button>
                        </div>
                        {error && <div>{error}</div>}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;