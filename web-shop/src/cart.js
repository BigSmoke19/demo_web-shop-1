import './styles/cart/cart.css'

const Cart = () => {
    const items = JSON.parse(localStorage.getItem('items'));
    const isHome = false;
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
                    {Array.from(JSON.parse(localStorage.getItem('items'))).map((item=>(
                        <div className="product">
                            <div className="products-left-section">
                                <p>X</p>
                                <img src={`data:image/jpeg;base64,${item.image}`} className="product-thumbnail"/>
                                <p>{item.name}</p>
                            </div>
                            <div className="products-right-section">
                                <p>${item.price}</p>
                                <div style={{paddingRight:"10px"}}>
                                    <button>+</button>
                                    <button>1</button>
                                    <button>-</button>
                                </div>
                                <p>${item.price}</p>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
            <div className="order-summary">
                <h1>Cart Totals</h1>
                <div className="cart-totals">
                    <p>SubTotal</p>
                    <p>...</p>
                </div>
                <div className='cart-totals'>
                    <p>Total</p>
                    <p>...</p>
                </div>
            </div>
        </div>
     );
}
 
export default Cart;