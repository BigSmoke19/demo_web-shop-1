import { useEffect, useState } from 'react';
import './styles/cart/cart.css';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [items,setItems] = useState(JSON.parse(localStorage.getItem('items')));
    const [total,setTotal] = useState(0);
    const [cookies] = useCookies(['email']);
    const userEmail = cookies.email;
    const url = "http://localhost/webshop-apis/addorder.php";
    const history = useNavigate();
    const token = localStorage.getItem('orderToken');


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
        console.log(sign);
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
        if(total !== 0 && userEmail != null){
            fetch(url,{
                method:'POST',
                headers:{"content-type":"application/json"},
                body:JSON.stringify({"data":items,"useremail":userEmail,"total":total,"token":token})
            }).then(
                () =>{
                    alert("order marked!");
                    history("/");
                }
            );        
        }
    }
    return ( 
        <div className="cart">
            <div className="items-container">
                <div className="items-title">
                    <div className="items-title-left-section">
                        <p>PRODUCT</p>
                    </div>
                    <div className='items-title-right-section'>
                        <p>PRICE</p>
                        <p>QUANTITY</p>
                        <p>SUBTOTAL</p>
                    </div>
                </div>
                <div className="products">
                    {Array.from(items).map((item=>(
                        <div className="product">
                            <div className="products-left-section">
                                <button onClick={()=>handeleDeleteItem(item.id)}>X</button>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="product-thumbnail"/>
                                <p>{item.name}</p>
                            </div>
                            <div className="products-right-section">
                                <p>${item.price}</p>
                                <div style={{paddingRight:"10px"}}>
                                    <button onClick={(e)=>handeleQuantity("+",item.id)}>+</button>
                                    <span> {item.quantity} </span>
                                    <button onClick={(e)=>handeleQuantity("-",item.id)}>-</button>
                                </div>
                                <p>${item.price * item.quantity}</p>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
            <div className="order-summary">
                <h1>Cart Totals</h1>
                <div className="cart-totals">
                    <p>SubTotal</p>
                    <p>{total}$</p>
                </div>
                <div className='cart-totals'>
                    <p>Total</p>
                    <p>{total}$</p>
                </div>
                <div className='cart-totals'>
                    <button onClick={handleCheckout}>Checkout</button>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;